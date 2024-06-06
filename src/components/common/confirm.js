import { useState } from "react";
import { useKey } from "react-use";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

const ConfirmDialog = (props) => {
  const { title, successMsg, children, open, close, callback } = props;

  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  useKey("Escape", handleCloseSnackbar);

  useKey("Enter", callback);

  return (
    <>
      <Dialog open={open || false} onClose={close} aria-labelledby="confirm-dialog">
        <DialogTitle id="confirm-dialog">{title ?? "Are you sure?"}</DialogTitle>
        <DialogContent>{successMsg ? <>{successMsg}</> : children}</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={close} color="warning">
            No
          </Button>
          <Button variant="contained" onClick={callback}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  );
};
export default ConfirmDialog;
