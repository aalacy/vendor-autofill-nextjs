import { useCallback, useRef, useState } from "react";
import { List, Paper, ListItem, ListItemText, TextField } from "@mui/material";
import toast from "react-hot-toast";

import { useAuth } from "src/hooks/use-auth";
import { splitCamelCase } from "src/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { JobService } from "src/services";
import LoadingOverlay from "../common/loading-overlay";

export const JobDataTable = () => {
  const { showConfirmDlg, hideConfirm, project, setProject, setProjects } = useAuth();
  const queryClient = useQueryClient();

  const [editingItemId, setEditingItemId] = useState(null);
  const [myJob, setJob] = useState();
  const inputRef = useRef();

  const { isLoading, data: job } = useQuery({
    queryKey: ["getAllJobs", project?.id],
    queryFn: async () => {
      const {
        data: { result },
      } = await JobService.mine(project?.id);
      setJob(result.data);
      if (!project) setProject(result);
      return result;
    },
  });

  const updateJob = useCallback(
    async (id, data) => {
      try {
        const {
          data: {
            result: { job, projects },
          },
        } = await JobService.update(id, data);
        setJob(job.data);
        setProjects(projects);
        queryClient.invalidateQueries({ queryKey: ["getAllJobs", job.id] });
      } catch (error) {
        toast.error(error?.response?.message || "Something went wrong");
      }
    },
    [setProjects, queryClient, setJob],
  );

  const handleChange = useCallback(
    (e, key) => {
      const newJob = { ...myJob, [key]: e.target.value };
      setJob(newJob);
    },
    [myJob],
  );

  const handleBlur = useCallback(() => {
    if (document.activeElement !== inputRef.current) {
      setEditingItemId(null);
      showConfirmDlg({
        open: true,
        close: () => {
          hideConfirm();
          setJob(job.data);
        },
        callback: () => {
          updateJob(job.id, { data: myJob });
          hideConfirm();
        },
      });
    }
  }, [job, myJob, hideConfirm, showConfirmDlg, updateJob]);

  if (!job) return <></>;

  return (
    <>
      <Paper raised="true" sx={{ mb: 2 }}>
        <List
          sx={{
            width: "100%",
            position: "relative",
            overflow: "auto",
            maxHeight: 300,
          }}
        >
          {myJob ? (
            Object.keys(myJob).map((key) => (
              <>
                {key !== "buyers" ? (
                  <ListItem divider key={`item-${key}`} onDoubleClick={() => setEditingItemId(key)}>
                    {editingItemId === key ? (
                      <TextField
                        ref={inputRef}
                        autoFocus={true}
                        label={splitCamelCase(key)}
                        variant="standard"
                        value={myJob[key]}
                        onChange={(e) => handleChange(e, key)}
                        onBlur={handleBlur}
                      />
                    ) : (
                      <ListItemText primary={splitCamelCase(key)} secondary={myJob[key]} />
                    )}
                  </ListItem>
                ) : null}
              </>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="Empty Project" />
            </ListItem>
          )}
        </List>
      </Paper>
      <LoadingOverlay open={isLoading} />
    </>
  );
};
