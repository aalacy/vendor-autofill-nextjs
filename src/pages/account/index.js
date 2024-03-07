import {
  Box,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import Head from "next/head";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AccountForm } from "src/components/account/account-form";
import { AvatarUpload } from "src/components/account/avatar-upload";

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
              <Typography variant="h6" mb={5}>Manage Account</Typography>
              <Typography
                variant="body2"
                color="GrayText"
                fontWeight="medium"
                mt={2}
              >
                Manage your Account Settings
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ ml: 4 }}>
                <AvatarUpload />
                <AccountForm />
              </Box>
        </Container>
      </Box>
    </>
  );
};

ManageAccount.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ManageAccount;

