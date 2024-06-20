import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export const Modal = (props) => {
  const { open, noFullWidth, title, subTitle, onClose, size, keepMounted, topActions, children } =
    props;

  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Dialog
      fullWidth={!noFullWidth}
      keepMounted={keepMounted}
      maxWidth={size || "lg"}
      fullScreen={!noFullWidth && fullScreen}
      open={open}
      scroll="body"
      onClose={onClose}
      aria-labelledby="Staff Add Modal"
      aria-describedby="Add Staff"
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack sx={{ ml: 2, overflow: 'auto' }}>
          <Typography variant="h6" title={title}>{title}</Typography>
          {subTitle && (
            <Typography variant="caption" color="GrayText">
              {subTitle}
            </Typography>
          )}
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
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
