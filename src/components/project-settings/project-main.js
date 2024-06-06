import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import {
  Refresh as RefreshIcon,
  Add as AddIcon,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material";

import { JobDataTable } from "src/components/project-settings/job-data";
import { useAuth } from "src/hooks/use-auth";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { JobService } from "src/services";
import toast from "react-hot-toast";

export const ProjectMain = () => {
  const { showJobForm, project, showConfirmDlg, hideConfirm, setProjects, setProject } = useAuth();
  const queryClient = useQueryClient();

  const deleteJob = useCallback(() => {
    showConfirmDlg({
      open: true,
      close: hideConfirm,
      callback: async () => {
        try {
          const {
            data: { result },
          } = await JobService.remove(project?.id);
          toast.success("Successfully Deleted");
          setProjects(result);
          if (result.length > 0) {
            setProject(result[0]);
          } else {
            setProject(null);
          }
        } catch (error) {
          toast.error(error?.response?.data?.message || error.message);
        } finally {
          hideConfirm();
        }
      },
    });
  }, [queryClient, project]);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <Typography variant="h5"
mb={5}>
          Project Settings
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Add new Job">
            <IconButton onClick={() => showJobForm(true)}
color="primary">
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete this Job">
            <span>
              <IconButton disabled={!!!project}
onClick={deleteJob}
color="error">
                <DeleteIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>
      <JobDataTable />
    </>
  );
};
