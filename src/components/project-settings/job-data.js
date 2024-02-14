import { useEffect } from "react";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "semantic-ui-react";

import { useAuth } from "src/hooks/use-auth";

export const JobDataTable = () => {
  const { job, fetchJob } = useAuth();

  useEffect(() => {
    if (!job) fetchJob();
  }, [job]);

  return (
    <div style={{ overflowX: "auto" }}>
      <Table celled unstackable striped className="dnxTable">
        <TableHeader>
          <TableRow>
            {Object.keys(job?.data).map((key) => (
              <TableHeaderCell key={key}>{key}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            {
              <>
                {Object.keys(job?.data).map((key) => (
                  <TableCell data-label={key} key={key}>
                    {job?.data[key]}
                  </TableCell>
                ))}
              </>
            }
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
