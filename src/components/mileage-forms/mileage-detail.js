import { Box, List, Paper, Stack, Typography, useMediaQuery } from "@mui/material";

import { formatLocalNumber, sum } from "src/utils";
import { MileageDetailItem } from "./mileage-detail-item";

const BottomRender = ({ label, value }) => (
  <Stack direction="row" spacing={1}>
    <Typography variant="body1" fontSize={18}>
      <b>{label}</b>
    </Typography>
    <Typography color="#8ab4f8" fontSize={20}>
      {value}
    </Typography>
  </Stack>
);

const MileageDetailContent = ({ row }) => {
  const isNonMobile = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <Box sx={{ flex: 1, flexWrap: "wrap", mx: "auto", width: "99%", p: 1, my: 1 }}>
      <Typography variant="h6" mb={1}>
        Mileages ({row.data.length})
      </Typography>
      <Paper>
        <List
          sx={{ width: "100%", maxHeight: 350, overflow: "auto", bgcolor: "background.toolbar" }}
        >
          {row.data.map((d, id) => (
            <MileageDetailItem key={id} item={d} />
          ))}
        </List>
      </Paper>
      <Stack direction={isNonMobile ? "row" : "column"} spacing={isNonMobile ? 2 : 0} mt={1}>
        <BottomRender
          label="Total # of miles:"
          value={formatLocalNumber(sum(row.data.map((d) => d.number_of_miles)))}
        />
        <BottomRender
          label="Total Mileage Reimbursement($):"
          value={formatLocalNumber(sum(row.data.map((d) => d.mileage_reimbursement)))}
        />
        <BottomRender label="Per mile($):" value={formatLocalNumber(row.price_per_mile)} />
      </Stack>
    </Box>
  );
};

export default MileageDetailContent;
