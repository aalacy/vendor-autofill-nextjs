import { Button, List, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material"
import { UploadFile, DocumentScanner as ViewIcon } from "@mui/icons-material"

import { Modal } from "src/components/common/modal"
import { VendorService } from "src/services"
import { ManageInvoice } from "./invoice"

export const InvoiceView = ({
    vendor, invoices, open, onClose, setShowPDFModal, setInvoice, setUrl, setGLoading, showInvoice, setShowInvoice, getData
}) => {
    const handleView = async (key) => {
        setInvoice(key.split('/').at(-1));
        try {
            const { data: { result } } = await VendorService.readCOI(key);
            setShowPDFModal(true);
            setUrl(result);
        } catch (error) {
            console.log('handleCOI', error)
        } finally {
            setGLoading(false);
        }
    }

    const handleMore = () => {
        onClose();
        setShowInvoice(true);
    }

    return (
        <>
            <Modal
                title={`${vendor?.name} - Invoices (${invoices.length})`}
                open={open}
                onClose={onClose}
                size="md"
            >
                <List
                    sx={{ width: 1 }}
                >
                    {
                        invoices.map(({ id, key }) => (
                            <ListItemButton  key={id} onClick={() => handleView(key)}>
                                <ListItemAvatar>
                                    <ViewIcon color="warning" fontSize="large" />
                                </ListItemAvatar>
                                <ListItemText primary={key.split('/').at(-1)} />
                            </ListItemButton>
                        ))
                    }
                </List>
                {
                    invoices.length < 10 && <Button onClick={handleMore} variant="outlined" startIcon={<UploadFile />} sx={{ mt: 2 }}>Upload More Invoices</Button>
                }
            </Modal>
            {showInvoice && <ManageInvoice
                vendor={vendor}
                open={true}
                setOpen={setShowInvoice}
                refreshData={getData}
            />}
        </>
    )
}