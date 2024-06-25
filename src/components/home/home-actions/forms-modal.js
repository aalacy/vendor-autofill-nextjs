import { List, ListItem, ListItemButton, Typography } from "@mui/material";
import { DocumentScanner as ViewIcon, VerifiedOutlined as W9Icon } from "@mui/icons-material";

import { Modal } from "src/components/common/modal";

export const FormsModal = ({ myVendor, open, onClose, handleGeneratePDF, handleW9 }) => {
  return (
    <Modal
      title={`${myVendor.vendor?.name} - Forms (${myVendor.vendor.forms.length})`}
      open={open}
      onClose={onClose}
      size="sm"
    >
      <List sx={{ width: 1 }}>
        <ListItem disablePadding sx={{ bgcolor: "background.paper", mb: 1, borderRadius: 2 }}>
          <ListItemButton onClick={handleW9}>
            <W9Icon /> <Typography ml={2}>W9</Typography>
          </ListItemButton>
        </ListItem>
        {myVendor.vendor.forms.map((form) => (
          <>
            <ListItem
              key={form}
              disablePadding
              sx={{ bgcolor: "background.paper", mb: 1, borderRadius: 2 }}
            >
              <ListItemButton onClick={() => handleGeneratePDF(myVendor, form)}>
                <ViewIcon /> <Typography ml={2}>{form.name}</Typography>
              </ListItemButton>
            </ListItem>
          </>
        ))}
      </List>
    </Modal>
  );
};
