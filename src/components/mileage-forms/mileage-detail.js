import { Box, List, Paper, Stack, Typography } from "@mui/material";

import { formatLocalNumber, sum } from "src/utils";
import { MileageDetailItem } from "./mileage-detail-item";

const MileageDetailContent = ({ row }) => {
  return (
      <Box sx={{ flex: 1, flexWrap: "wrap", mx: "auto", width: "99%", p: 1, my: 1 }}>
        <Typography variant="h6" mb={1}>
          Mileages ({row.data.length})
        </Typography>
        <Paper>
        <List sx={{ width: "100%", maxHeight: 300, overflow: 'auto', bgcolor: "background.toolbar" }}>
          {row.data.map((d, id) => (
            <MileageDetailItem key={id} item={d} />
          ))}
        </List>
        </Paper>
        {/* <ClientDataGrid
          data={ || []}
          columns={MileageDetailColumns}
        /> */}
        <Stack spacing={1} mt={1}>
          <Stack direction="row" mb={1} spacing={1}>
            <Typography variant="body1" fontSize={20}>
              <b>Total # of miles:</b>
            </Typography>
            <Typography color="#8ab4f8" fontSize={22}>
              {" "}
              {formatLocalNumber(sum(row.data.map((d) => d.number_of_miles)))}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="body1" fontSize={20}>
              <b>Total Mileage Reimbursement($):</b>
            </Typography>
            <Typography color="#8ab4f8" fontSize={22}>
              {formatLocalNumber(sum(row.data.map((d) => d.mileage_reimbursement)))}
            </Typography>
          </Stack>
        </Stack>
      </Box>
  );
};

export default MileageDetailContent;
