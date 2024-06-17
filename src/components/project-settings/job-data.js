import { useCallback, useRef, useState } from "react";
import { Paper } from "@mui/material";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "src/hooks/use-auth";
import { JobService } from "src/services";
import LoadingOverlay from "../common/loading-overlay";
import { JobDataAccordions } from "./job-items";

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
        toast.error(err.response?.data || err.message);
      }
    },
    [setProjects, queryClient, setJob],
  );

  const handleChange = useCallback(
    (e, key) => {
      const newJob = { ...myJob, [key]: e };
      setJob(newJob);
    },
    [myJob],
  );

  const handleBlur = useCallback(() => {
    console.log('document.activeElement', document.activeElement)
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
  }, [job, myJob, hideConfirm, showConfirmDlg, updateJob, document.activeElement]);

  if (!job) return <></>;

  return (
    <>
      <Paper raised="true" sx={{ mb: 2 }}>
        <JobDataAccordions
          myJob={myJob}
          inputRef={inputRef}
          handleChange={handleChange}
          handleBlur={handleBlur}
          editingItemId={editingItemId}
          setEditingItemId={setEditingItemId}
        />
      </Paper>
      <LoadingOverlay open={isLoading} />
    </>
  );
};
