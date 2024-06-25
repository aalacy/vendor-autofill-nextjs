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
  setMyVendor,
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

  const showQuoteInvoiceForm = () => {
    setShowInvoiceQuoteForm(true);
  };


  const handleMore = () => {
    setCurInvoice(null);
    showQuoteInvoiceForm();
  };


  const topOrdersActions = useMemo(() => {
    return (
      <>
        {responsive ? (
          <Button onClick={handleMore} variant="outlined" startIcon={<UploadFile />} sx={{ mt: 2 }}>
            Upload Quotes, Invoices
          </Button>
        ) : (
          <Tooltip title=" Upload Quotes, Invoices">
            <IconButton color="primary" onClick={handleMore}>
              <UploadFile />
            </IconButton>
          </Tooltip>
        )}
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
        <Stack spacing={2} divider={<Divider variant="inset" />}>
          <InvoiceListItem
            vendorName={myVendor.vendor.name}
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
            showEditForm={showQuoteInvoiceForm}
            myVendor={myVendor}
            setMyVendor={setMyVendor}
            setShowReplace={setShowReplace}
          />
          <InvoiceListItem
            vendorName={myVendor.vendor.name}
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
            showEditForm={showQuoteInvoiceForm}
            myVendor={myVendor}
            setMyVendor={setMyVendor}
            setShowReplace={setShowReplace}
          />
          <InvoiceListItem
            vendorName={myVendor.vendor.name}
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
            showEditForm={showQuoteInvoiceForm}
            myVendor={myVendor}
            setMyVendor={setMyVendor}
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
          setMyVendor={setMyVendor}
          invoice={curInvoice}
          open={true}
          onClose={() => {
            setShowReplace(false);
          }}
        />
      )}
    </>
  );
};

export default InvoiceView;
