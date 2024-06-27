import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";

import { VendorService } from "src/services";
import { Modal } from "../common/modal";
import { AddCircleOutline, HourglassBottomOutlined } from "@mui/icons-material";
const COISchedule = dynamic(() => import("./coi-schedule"), { ssr: false });
const TemplateList = dynamic(() => import("./template-list"), { ssr: false });

export const HeaderForm = ({ vendors }) => {
  const [showTemplate, setShowTemplate] = useState(false);
  const [showRequestCOI, setShowRequestCOI] = useState(false);

  const { data: templates } = useQuery({
    queryKey: ["getAllVendorTemplates"],
    queryFn: async () => {
      const {
        data: { result },
      } = await VendorService.allTemplates();
      return result;
    },
  });

  const onCloseTemplate = () => setShowTemplate(false);

  const onCloseRequestCOI = () => setShowRequestCOI(false);

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
            <IconButton color="primary" onClick={() => setShowRequestCOI(true)}>
              <HourglassBottomOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add Vendor">
            <IconButton color="primary" onClick={() => setShowTemplate(true)}>
              <AddCircleOutline />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      {showTemplate && (
        <Modal
          title={`Select Vendors (${templates.length})`}
          open={true}
          onClose={onCloseTemplate}
        >
          <TemplateList vendors={vendors} templates={templates} onClose={onCloseTemplate} />
        </Modal>
      )}

      {/* Request COI */}
      {showRequestCOI && (
        <Modal size="sm" title="Request COI" open={true} onClose={onCloseRequestCOI}>
          <COISchedule vendors={vendors} onClose={onCloseRequestCOI} />
        </Modal>
      )}
    </>
  );
};
