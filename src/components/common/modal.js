import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export const Modal = (props) => {
  const { open, title, subTitle, onClose, size, keepMounted, children } = props;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullWidth
      keepMounted={keepMounted}
      maxWidth={size || "lg"}
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="Staff Add Modal"
      aria-describedby="Add Staff"
    >
      <DialogTitle>
        <div>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="caption" color="GrayText">
            {subTitle}
          </Typography>
        </div>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
