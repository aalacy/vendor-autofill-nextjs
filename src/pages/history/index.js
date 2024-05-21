import Head from "next/head";
import { Box, Container } from "@mui/material";
import { useState } from "react";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
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
