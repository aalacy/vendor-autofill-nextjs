import { Box, Typography, Container, IconButton, Tooltip } from "@mui/material";
import { Refresh as RefreshIcon, Add as AddIcon } from "@mui/icons-material";
import Head from "next/head";

import { JobDataTable } from "src/components/project-settings/job-data";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useAuth } from "src/hooks/use-auth";
import { JobFormModal } from "src/components/job-form/job-form-modal";

const ProjectSettings = () => {
  const { fetchJob, showJobForm } = useAuth();

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
          <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <Typography variant="h5" mb={5}>
              Project Settings
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Tooltip title="Add new Job">
                <IconButton  onClick={() => showJobForm(true)} color="primary">
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Refetch the Job data">
                <IconButton onClick={fetchJob} color="primary">
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <JobDataTable />
        </Container>
      </Box>
      <JobFormModal />
    </>
  );
};

ProjectSettings.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ProjectSettings;
