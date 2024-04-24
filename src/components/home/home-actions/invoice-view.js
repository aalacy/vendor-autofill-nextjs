import { Box, Button, CircularProgress, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField, Tooltip } from "@mui/material"
import { AttachMoney, Edit, UploadFile, DocumentScanner as ViewIcon } from "@mui/icons-material"
import { useState } from "react"
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";

import { Modal } from "src/components/common/modal"
import { VendorService } from "src/services"
import { ManageInvoice } from "./invoice"
import { currencyFormatter } from "src/utils";

export const InvoiceView = ({
    vendor, invoices, setInvoices, open, onClose, setShowPDFModal, setInvoice, setUrl, setGLoading, showInvoice, setShowInvoice, getData
}) => {
    const [showPrompt, setShowPrompt] = useState(false);
    const [loading, setLoading] = useState(false);
    const [curInvoiceId, setCurInvoiceId] = useState();

    const handleView = async (id, key, total) => {
        if (!total) {
            setCurInvoiceId(id);
            return setShowPrompt(true);
        }

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

    const formik = useFormik({
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const { data: { detail } } = await VendorService.addTotal2Invoice(curInvoiceId, values.total);
                toast.success(detail);
                setInvoices((prev) => (
                    prev.map(invoice => {
                        if (invoice.id === curInvoiceId) return {
                            ...invoice,
                            total: values.total
                        }
                        return invoice
                    })
                ))
                getData()
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        },
        initialValues: {
            total: 0,
        },
        validationSchema: yup.object().shape({
            total: yup.number().required("Required"),
        }),
    });

    const handleClose = () => {
        formik.resetForm();
        setShowPrompt(false);
    }

    const handleEdit = (id, total) => {
        formik.setFieldValue('total', total);
        setCurInvoiceId(id);
        setShowPrompt(true);
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
                        invoices.map(({ id, key, total }) => (
                            <ListItem
                                key={key}
                                secondaryAction={
                                    total && <Tooltip title="Edit Total">
                                        <IconButton onClick={() => handleEdit(id, total)} size="small" color="secondary" edge="end" aria-label="comments">
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                }
                                disablePadding
                            >
                                <ListItemButton key={id} onClick={() => handleView(id, key, total)}>
                                    <ListItemAvatar>
                                        <ViewIcon color="warning" fontSize="large" />
                                    </ListItemAvatar>
                                    <ListItemText primary={key.split('/').at(-1)} secondary={`${currencyFormatter(total)}`} />
                                </ListItemButton>
                            </ListItem>
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
            {
                showPrompt && <Modal noFullWidth title="Input Total Price" open={true} onClose={handleClose} size="xs">
                    <form onSubmit={formik.handleSubmit}>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <TextField
                                type="number"
                                size="small"
                                label="Total"
                                autoFocus
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.total}
                                name="total"
                                error={!!formik.touched.total && !!formik.errors.total}
                                helperText={formik.touched.total && formik.errors.total}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AttachMoney />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={20} /> : null}
                                type="submit"
                                variant="contained"
                            >
                                Save
                            </Button>
                        </Box>
                    </form>
                </Modal>
            }
        </>
    )
}