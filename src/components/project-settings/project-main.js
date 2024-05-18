import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import { Refresh as RefreshIcon, Add as AddIcon } from "@mui/icons-material";

import { JobDataTable } from "src/components/project-settings/job-data";
import { useAuth } from "src/hooks/use-auth";
import { JobFormModal } from "src/components/job-form/job-form-modal";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const ProjectMain = () => {
  const { showJobForm, project } = useAuth();
  const queryClient = useQueryClient();

  const fetchJob = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["getAllJobs", project] });
  }, [queryClient, project]);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <Typography variant="h5" mb={5}>
          Project Settings
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Add new Job">
            <IconButton onClick={() => showJobForm(true)} color="primary">
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
      <JobFormModal />
    </>
  );
};
