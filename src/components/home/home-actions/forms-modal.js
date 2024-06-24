import { List, ListItem, ListItemButton, Typography } from "@mui/material";
import { DocumentScanner as ViewIcon } from "@mui/icons-material";

import { Modal } from "src/components/common/modal";

export const FormsModal = ({ myVendor, open, onClose, handleGeneratePDF }) => {
  return (
    <Modal
      title={`${myVendor.vendor?.name} - Forms (${myVendor.vendor.forms.length})`}
      open={open}
      onClose={onClose}
      size="sm"
    >
      <List sx={{ width: 1 }}>
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
