import { useCallback } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import { AddCircleOutline as AddIcon } from "@mui/icons-material";

import { useAuth } from "src/hooks/use-auth";
import { useQueryClient } from "@tanstack/react-query";

export const ProjectPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const queryClient = useQueryClient();
  const auth = useAuth();

  const handleProject = useCallback(
    (project) => {
      onClose?.();
      auth.setProject(project);
      queryClient.invalidateQueries({ queryKey: ["getAllJobs", project.id] });
    },
    [onClose, auth, queryClient],
  );

  const handleNewProject = useCallback(() => {
    onClose?.();
    auth.showJobForm(true);
  }, [auth, onClose]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      slotProps={{
        paper: { sx: { width: 200 } },
      }}
    >
      <Box
        sx={{
          py: 1,
          px: 2,
        }}
      >
        <Typography color="text.secondary" variant="body2">
          Projects
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        {auth?.projects?.map((project) => (
          <MenuItem
            selected={project.id === auth?.project?.id}
            key={project.id}
            onClick={() => handleProject(project)}
            sx={{ textTransform: "capitalize" }}
          >
            <ListItemText>{project.name}</ListItemText>
          </MenuItem>
        ))}
        <MenuItem onClick={handleNewProject} sx={{ textTransform: "capitalize", mt: 1 }}>
          <ListItemIcon>
            <AddIcon color="primary" fontSize="small" />
          </ListItemIcon>
          <ListItemText>New Project</ListItemText>
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

ProjectPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
