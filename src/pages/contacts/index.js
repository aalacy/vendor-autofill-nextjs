import {
  Box,
  Card,
  Button,
  CardContent,
  Container,
  Divider,
  Typography,
  Tooltip,
} from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import { Add, FileDownload } from "@mui/icons-material";

import { ContactList } from "src/components/contacts/contact-list";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ContactAddModal } from "src/components/contacts/contact-add-modal";
import { downloadOneCSV } from "src/utils/csv";

const ContactView = () => {
  const [contacts, setContacts] = useState();
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState();

  const handleEdit = (id) => {
    setContact(contacts.items.find((item) => item.id === id));
    setOpen(true);
  };

  const handleExport = () => {
    downloadOneCSV(contacts.items, "contacts");
  };

  return (
    <>
      <Head>
        <title>Contacts</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6">Contacts</Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Tooltip title="Add New Contact">
                    <Button
                      size="small"
                      onClick={() => setOpen(true)}
                      startIcon={<Add />}
                      variant="contained"
                    >
                      Add
                    </Button>
                  </Tooltip>
                  <Tooltip title="Export as CSV">
                    <Button
                      size="small"
                      onClick={handleExport}
                      startIcon={<FileDownload />}
                      variant="outlined"
                    >
                      Export
                    </Button>
                  </Tooltip>
                </Box>
              </Box>
              <Divider sx={{ my: 1 }} />
              <ContactList contacts={contacts} setContacts={setContacts} handleEdit={handleEdit} />
            </CardContent>
          </Card>
        </Container>
      </Box>
      <ContactAddModal contact={contact} open={open} setOpen={setOpen} />
    </>
  );
};

ContactView.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ContactView;
