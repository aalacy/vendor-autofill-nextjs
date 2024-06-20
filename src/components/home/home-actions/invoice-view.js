import { Button, Divider, IconButton, Stack, Tooltip, useMediaQuery } from "@mui/material";
import { UploadFile, VerifiedOutlined as W9Icon } from "@mui/icons-material";
import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";

import { Modal } from "src/components/common/modal";
const ManageInvoice = dynamic(() => import("./invoice"), { ssr: false });
import { currencyFormatter, sum } from "src/utils";
import { InvoiceListItem } from "./invoice-list-item";

const InvoiceView = ({
  myVendor,
  open,
  onClose,
  setShowInvoiceQuoteForm,
  setShowPDFModal,
  setSecondaryName,
  setUrl,
  setGLoading,
  setSubTitle,
  setCurInvoice,
  curInvoice,
}) => {
  const [showReplace, setShowReplace] = useState(false);
  const [uploadTitle, setUploadTitle] = useState({
    title: `Upload Invoices, Quotes for ${myVendor.vendor?.name}`,
    subTitle: "",
  });
  const [maxFileLimit, setMaxFileLimit] = useState(10 - myVendor.invoices.length);

  const responsive = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const handleMore = () => {
    setShowInvoiceQuoteForm(true);
  };

  // const handleW9 = async () => {
  //   setSecondaryName("W9");
  //   setGLoading(true);
  //   try {
      // const {
      //     data: { result },
      //   } = await VendorService.readPDF(myVendor.vendor.w9);
      //   setShowPDFModal(true);
        setUrl(result);
  //   } catch (err) {
  //     toast.error(err.response?.data || err.message);
  //   } finally {
  //     setGLoading(false);
  //   }
  // };

  const topOrdersActions = useMemo(() => {
    return (
      <>
        {responsive ? (
          <Button onClick={handleMore} variant="outlined" startIcon={<UploadFile />} sx={{ mt: 2 }}>
            Upload Quotes, Invoices
          </Button>
        ) : (
          <Tooltip title=" Upload Quotes, Invoices">
            <IconButton onClick={handleMore}>
              <UploadFile />
            </IconButton>
          </Tooltip>
        )}

        {/* <Tooltip title={myVendor.vendor.w9 ? "Show" : "Empty"}>
          <span>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleW9(myVendor);
              }}
              disabled={!!!myVendor.vendor.w9}
            >
              <W9Icon color={myVendor.vendor.w9 ? "primary" : "inherit"} />
            </IconButton>
          </span>
        </Tooltip> */}
      </>
    );
  }, []);

  const filteredInvoices = useCallback(
    (order_type = "Invoice") => {
      return myVendor.invoices.filter((invoice) => invoice.order_type === order_type);
    },
    [myVendor],
  );

  return (
    <>
      <Modal
        title={`${myVendor.vendor?.name} - Orders (${myVendor.invoices.length})`}
        subTitle={currencyFormatter(sum(myVendor.invoices.map((i) => i.amount).filter((v) => v)))}
        open={open}
        onClose={onClose}
        size="md"
        topActions={topOrdersActions}
      >
        <Stack spacing={2} divider={<Divider variant="inset" flexItem />}>
          <InvoiceListItem
            subheader={`Invoices - (${filteredInvoices().length})`}
            items={filteredInvoices()}
            setUploadTitle={setUploadTitle}
            setMaxFileLimit={setMaxFileLimit}
            setShowPDFModal={setShowPDFModal}
            setSecondaryName={setSecondaryName}
            setUrl={setUrl}
            setGLoading={setGLoading}
            setSubTitle={setSubTitle}
            setCurInvoice={setCurInvoice}
            onClose={onClose}
            showEditForm={handleMore}
            myVendor={myVendor}
            setShowReplace={setShowReplace}
          />
          <InvoiceListItem
            subheader={`Quotes - (${filteredInvoices("Quote").length})`}
            items={filteredInvoices("Quote")}
            setUploadTitle={setUploadTitle}
            setMaxFileLimit={setMaxFileLimit}
            setShowPDFModal={setShowPDFModal}
            setSecondaryName={setSecondaryName}
            setUrl={setUrl}
            setGLoading={setGLoading}
            setSubTitle={setSubTitle}
            setCurInvoice={setCurInvoice}
            onClose={onClose}
            showEditForm={handleMore}
            myVendor={myVendor}
            setShowReplace={setShowReplace}
          />
          <InvoiceListItem
            subheader={`Placeholders - (${filteredInvoices("Placeholder").length})`}
            items={filteredInvoices("Placeholder")}
            setUploadTitle={setUploadTitle}
            setMaxFileLimit={setMaxFileLimit}
            setShowPDFModal={setShowPDFModal}
            setSecondaryName={setSecondaryName}
            setUrl={setUrl}
            setGLoading={setGLoading}
            setSubTitle={setSubTitle}
            setCurInvoice={setCurInvoice}
            onClose={onClose}
            showEditForm={handleMore}
            myVendor={myVendor}
            setShowReplace={setShowReplace}
          />
        </Stack>
      </Modal>
      {showReplace && (
        <ManageInvoice
          maxFileLimit={maxFileLimit}
          title={uploadTitle.title}
          subTitle={uploadTitle.subTitle}
          myVendor={myVendor}
          invoice={curInvoice}
          open={true}
          onClose={() => {
            setShowReplace(false);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default InvoiceView;
