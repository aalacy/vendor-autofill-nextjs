import { Typography, Link } from "@mui/material";

import { Modal } from "../common/modal";
import { useAuth } from "src/hooks/use-auth";

export const AlertJob = ({ open, onClose }) => {
  const { user } = useAuth();

  return (
    <>
      <Modal open={open} onClose={onClose} title="Alert" size="sm">
        <Typography variant="h4" textAlign="center" mb={5}>
          Warning!
        </Typography>
        <Typography variant="body1" mb={1} textAlign="center">
          No Job Information was found for {user?.email} <br />
          Please Submit Job Info{" "}
          <Link
            target="_blank"
            href="https://docs.google.com/forms/d/e/1FAIpQLSfepOYOEMB_BIXFOjILXYsMsVCWAGLlr_QrTfoKo77gNZzI8Q/viewform"
          >
            here
          </Link>
        </Typography>
      </Modal>
    </>
  );
};
