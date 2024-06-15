import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import { Add as AddIcon, DeleteOutline as DeleteIcon } from "@mui/icons-material";
import { useCallback } from "react";
import toast from "react-hot-toast";

import { JobDataTable } from "src/components/project-settings/job-data";
import { useAuth } from "src/hooks/use-auth";
import { JobService } from "src/services";

export const ProjectMain = () => {
  const { showJobForm, project, setUser, showConfirmDlg, hideConfirm, setProjects, setProject } =
    useAuth();

  const deleteJob = useCallback(() => {
    showConfirmDlg({
      open: true,
      close: hideConfirm,
      callback: async () => {
        try {
          const {
            data: {
              result: { projects, user },
            },
          } = await JobService.remove(project?.id);
          toast.success("Successfully Deleted");
          setProjects(projects);
          setUser(user);
          if (projects.length > 0) {
            setProject(projects[0]);
          } else {
            setProject(null);
          }
        } catch (error) {
          toast.error(error?.response?.data || error.message);
        } finally {
          hideConfirm();
        }
      },
    });
  }, [project, hideConfirm, setProject, setProjects, showConfirmDlg]);

  return (
    <>
      <Box
        sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", p: 1 }}
      >
        <Typography variant="h5" mb={5} textTransform="capitalize">
          {project ? `${project?.name} - ${project?.jobNumber}` : "No Job"}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Add new Job">
            <IconButton onClick={() => showJobForm(true)} color="primary">
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete this Job">
            <span>
              <IconButton disabled={!!!project} onClick={deleteJob} color="error">
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
