import { useEffect } from "react";

import { ClientDataGrid } from "../client-datagrid";
import { JobInfoColumns } from "src/columns";
import { useAuth } from "src/hooks/use-auth";

export const JobDataTable = () => {
  const { job, fetchJob } = useAuth();

  useEffect(() => {
    if (!job) fetchJob();
  }, [job]);

  return (
    <div style={{ height: 200, width: "100%" }}>
      <ClientDataGrid data={[{ id: "1", ...job?.data }]} columns={JobInfoColumns(job?.data)} />
    </div>
  );
};
