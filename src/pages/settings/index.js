import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useAuth } from "src/hooks/use-auth";
import { JobFormModal } from "src/components/job-form/job-form-modal";
import { ManageUsers } from "src/components/settings/manage-users";
import { ManageVendors } from "src/components/settings/manage-vendors";

const Page = () => {
    return (
        <>
            <Head>
                <title>Settings</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                }}
            >
                <Container maxWidth="xl">
                    <Typography>Users</Typography>
                    <ManageUsers />
                    {/* <ManageVendors /> */}
                </Container>
            </Box>
            <JobFormModal />
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
