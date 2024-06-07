import { Box, Typography } from "@mui/material";

import { MileageDetailColumns } from "src/columns";
import { ClientDataGrid } from "../tables/client-datagrid";
import { formatLocalNumber, sum } from "src/utils";

const MileageDetailContent = ({ row }) => {
  return (
    <Box sx={{ height: 300, m: 2 }}>
      <Typography variant="h6" mb={1}>
        Mileages
      </Typography>
      <ClientDataGrid
        data={row.data.map((d, id) => ({ id, ...d })) || []}
        columns={MileageDetailColumns}
      />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, my: 1 }}>
        <Box sx={{ display: "flex", mb: 1 }}>
          <b>Total # of miles:</b>
          <Typography color="#8ab4f8" ml={1}>
            {" "}
            {formatLocalNumber(sum(row.data.map((d) => d.number_of_miles)))}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", mb: 1 }}>
          <b>Total Mileage Reimbursement($):</b>
          <Typography color="#8ab4f8" ml={1}>
            {formatLocalNumber(sum(row.data.map((d) => d.mileage_reimbursement)))}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MileageDetailContent;
