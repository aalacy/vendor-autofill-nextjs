import { Box, Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { VendorService } from "src/services";
import { AlertJob } from "./alert-job";
import { TemplateList } from "./template-list";
import { Modal } from "../common/modal";
import {
  AddCircleOutline,
  AddOutlined as AddIcon,
  HourglassBottomOutlined,
} from "@mui/icons-material";

export const HeaderForm = ({ vendors }) => {
  const [openJobAlert, setOpenJobAlert] = useState(false);
  const [show, setShow] = useState(false);

  const { data: templates } = useQuery({
    queryKey: ["getAllVendorTemplates"],
    queryFn: async () => {
      const {
        data: { result },
      } = await VendorService.allTemplates();
      return result;
    },
  });

  const onClose = () => setShow(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 2,
          mb: 5,
        }}
      >
        <Typography variant="h5">Vendor Forms</Typography>
        <Stack direction="row">
          <Tooltip title="Manage COI Requests">
            <IconButton color="primary">
              <HourglassBottomOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add Vendor">
            <IconButton color="primary" onClick={() => setShow(true)}>
              <AddCircleOutline />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <AlertJob open={openJobAlert} onClose={() => setOpenJobAlert(false)} />
      {show && (
        <Modal
          size="sm"
          title={`Select Vendors (${templates.length})`}
          open={show}
          onClose={onClose}
        >
          <TemplateList vendors={vendors} templates={templates} onClose={onClose} />
        </Modal>
      )}
    </>
  );
};
