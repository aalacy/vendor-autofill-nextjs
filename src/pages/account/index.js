import { Box, Button, Container, Divider, Typography } from "@mui/material";
import Head from "next/head";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AccountForm } from "src/components/account/account-form";
import { AvatarUpload } from "src/components/account/avatar-upload";
import { Money } from "@mui/icons-material";
import { ProjectMain } from "src/components/project-settings/project-main";

const ManageAccount = () => {
  return (
    <>
      <Head>
        <title>Your Account</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Typography variant="h5"
mb={5}>
              Manage Account
            </Typography>
            <Button startIcon={<Money />}
size="small"
variant="outlined"
href="/pricing">
              Upgrade Plan
            </Button>
          </Box>
          <Box sx={{ ml: 4 }}>
            <AvatarUpload />
            <AccountForm />
          </Box>
          <Divider sx={{ my: 1 }} />

          <ProjectMain />
        </Container>
      </Box>
    </>
  );
};

ManageAccount.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ManageAccount;
