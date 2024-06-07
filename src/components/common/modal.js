import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export const Modal = (props) => {
  const { open, noFullWidth, title, subTitle, onClose, size, keepMounted, topActions, children } =
    props;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullWidth={!noFullWidth}
      keepMounted={keepMounted}
      maxWidth={size || "lg"}
      fullScreen={!noFullWidth && fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="Staff Add Modal"
      aria-describedby="Add Staff"
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <Typography variant="h6">{title}</Typography>
          {subTitle && (
            <Typography variant="caption"
color="GrayText">
              {subTitle}
            </Typography>
          )}
        </div>
        <Stack direction="row"
alignItems="center"
spacing={1}>
          {topActions}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
