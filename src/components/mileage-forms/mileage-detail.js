import { Box, Typography } from "@mui/material";

import { MileageDetailColumns } from "src/columns";
import { ClientDataGrid } from "../tables/client-datagrid";
import { formatLocalNumber, sum } from "src/utils";

export const MileageDetailContent = ({ row }) => {
  return (
    <Box sx={{ height: 300, m: 2 }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 1 }}>
        <Typography>
          <b>Total # of miles:</b> {formatLocalNumber(sum(row.data.map((d) => d.number_of_miles)))}
        </Typography>
        <Typography>
          <b>Total Mileage Reimbursement($):</b>{" "}
          {formatLocalNumber(sum(row.data.map((d) => d.mileage_reimbursement)))}
        </Typography>
      </Box>
      <ClientDataGrid
        data={row.data.map((d, id) => ({ id, ...d })) || []}
        columns={MileageDetailColumns}
      />
    </Box>
  );
};
