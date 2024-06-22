import {
  AccessTime,
  ArrowBackOutlined,
  ArrowForwardOutlined,
  AttachMoneyOutlined,
  Directions,
} from "@mui/icons-material";
import { Divider, ListItem, ListItemText, Stack, Typography, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { beautyDate, formatLocalNumber } from "src/utils";

export const MileageDetailItem = ({ item }) => {
  const isNonMobile = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <ListItem divider={<Divider variant="inset" component="li" />} sx={{ borderRadius: 1, mb: 1 }}>
      <Grid container spacing={1} width={1}>
        <Grid md={3} xs={12}>
          <ListItemText
            primary={item.business_purpose}
            primaryTypographyProps={{
              mb: 1,
              variant: "body1",
            }}
            secondary={
              <Stack direction="row" spacing={1}>
                <AccessTime fontSize="small" />
                <Typography color="GrayText" variant="subtitle2">
                  {beautyDate(item.date)}
                </Typography>
              </Stack>
            }
          />
        </Grid>
        <Grid md={6} xs={12}>
          <ListItemText
            primary={
              <Stack direction="row" spacing={1} mb={1}>
                <ArrowForwardOutlined color="info" /> <Typography>{item.from_address}</Typography>
              </Stack>
            }
            secondary={
              <Stack direction="row" spacing={1}>
                <ArrowBackOutlined color="success" />
                <Typography>{item.to_address}</Typography>
              </Stack>
            }
          />
        </Grid>
        <Grid md={3} xs={12}>
          <ListItemText
            primary={
              <Stack direction="row" spacing={1} mb={1}>
                <Directions color="info" />{" "}
                <Typography>{formatLocalNumber(item.number_of_miles)} mi</Typography>
              </Stack>
            }
            secondary={
              <Stack direction="row" spacing={1}>
                <AttachMoneyOutlined color="success" />
                <Typography color="GrayText">
                  {formatLocalNumber(item.mileage_reimbursement)}
                </Typography>
              </Stack>
            }
          />
        </Grid>
      </Grid>
    </ListItem>
  );
};
