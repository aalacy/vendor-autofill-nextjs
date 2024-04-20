import Head from "next/head";
import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { VendorList } from "src/components/home/vendor-list";
import { HeaderForm } from "src/components/home/header-form";
import { useAuth } from "src/hooks/use-auth";
import { JobFormModal } from "src/components/job-form/job-form-modal";
import { HistoryList } from "src/components/history/history-list";

const Page = () => {
    const [histories, setHistories] = useState([])
    return (
        <>
            <Head>
                <title>Vendor Forms</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                }}
            >
                <Container maxWidth="xl">
                    <HistoryList
                        histories={histories}
                        setHistories={setHistories}
                    />
                </Container>
            </Box>
        </>
    )
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
