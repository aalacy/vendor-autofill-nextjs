import { Typography } from "@mui/material";

import { Modal } from "../common/modal";

export const ThankYou = ({ open, onClose, text }) => {
  return (
    <>
      <Modal noFullWidth open={open} onClose={onClose} title="Info" size="sm">
        <Typography variant="h4" textAlign="center" mb={5}>
          Thank You!
        </Typography>
        {text}
      </Modal>
    </>
  );
};
