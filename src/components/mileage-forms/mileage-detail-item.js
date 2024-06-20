import {
  AccessTime,
  ArrowBackOutlined,
  ArrowForwardOutlined,
  AttachMoneyOutlined,
  Directions,
  DirectionsOutlined,
  Room,
} from "@mui/icons-material";
import {
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { beautyDate, formatLocalNumber } from "src/utils";

export const MileageDetailItem = ({ item }) => {
  const isNonMobile = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <ListItem
      alignItems="flex-start"
      divider={<Divider variant="inset" component="li" />}
      sx={{ borderRadius: 1, mb: 1, gap: 1, flexWrap: "wrap" }}
    >
      <Stack direction={isNonMobile ? "row" : "column"} spacing={2}>
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
          sx={{ maxWidth: 300 }}
        />
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
      </Stack>
    </ListItem>
  );
};
