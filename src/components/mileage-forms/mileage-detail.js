import { Box, Paper, Stack, Typography } from "@mui/material";

import { MileageDetailColumns } from "src/columns";
import { ClientDataGrid } from "../tables/client-datagrid";
import { formatLocalNumber, sum } from "src/utils";

const MileageDetailContent = ({ row }) => {
  return (
    <Stack sx={{ py: 1, height: "100%", boxSizing: "border-box" }}
direction="column">
      <Paper sx={{ flex: 1, flexWrap: "wrap", mx: "auto", width: "99%", p: 1 }}>
        <Typography variant="h6"
mb={1}>
          Mileages
        </Typography>
        <ClientDataGrid
          data={row.data.map((d, id) => ({ id, ...d })) || []}
          columns={MileageDetailColumns}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 1 }}>
          <Stack direction="row"
mb={1}
spacing={1}>
            <Typography variant="body2"
fontSize={20}>
              <b>Total # of miles:</b>
            </Typography>
            <Typography color="#8ab4f8"
fontSize={22}>
              {" "}
              {formatLocalNumber(sum(row.data.map((d) => d.number_of_miles)))}
            </Typography>
          </Stack>
          <Stack direction="row"
spacing={1}>
            <Typography variant="body2"
fontSize={20}>
              <b>Total Mileage Reimbursement($):</b>
            </Typography>
            <Typography color="#8ab4f8"
fontSize={22}>
              {formatLocalNumber(sum(row.data.map((d) => d.mileage_reimbursement)))}
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Stack>
  );
};

export default MileageDetailContent;
