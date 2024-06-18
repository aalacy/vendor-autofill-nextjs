import { Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { useAuth } from "src/hooks/use-auth";
import { JobService } from "src/services";
import LoadingOverlay from "../common/loading-overlay";
import { JobDataAccordions } from "./job-items";

export const JobDataTable = () => {
  const {  project, setProject } = useAuth();

  const { isLoading, data: job } = useQuery({
    queryKey: ["getAllJobs", project?.id],
    queryFn: async () => {
      const {
        data: { result },
      } = await JobService.mine(project?.id);
      if (!project) setProject(result);
      return result;
    },
  });


  if (!job) return <></>;

  return (
    <>
      <Paper raised="true"
sx={{ mb: 2 }}>
        <JobDataAccordions
          job={job}
        />
      </Paper>
      <LoadingOverlay open={isLoading} />
    </>
  );
};
