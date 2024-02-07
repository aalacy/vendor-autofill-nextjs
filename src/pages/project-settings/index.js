import { Box, Card, CardHeader, CardContent, Container, IconButton, Tooltip } from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import Head from "next/head";

import { JobDataTable } from "src/components/project-settings/job-data";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useAuth } from "src/hooks/use-auth";

const ProjectSettings = () => {
  const { fetchJob } = useAuth();

  return (
    <>
      <Head>
        <title>Project Settings</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Card>
            <CardHeader
              title="Project Settings"
              action={
                <Tooltip title="Refetch the Job data">
                  <IconButton onClick={fetchJob} color="primary">
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              }
            />
            <CardContent>
              <JobDataTable />
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

ProjectSettings.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ProjectSettings;
