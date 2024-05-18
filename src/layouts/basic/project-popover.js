import { useCallback } from "react";
import PropTypes from "prop-types";
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from "@mui/material";

import { useAuth } from "src/hooks/use-auth";
import { useQueryClient } from "@tanstack/react-query";

export const ProjectPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const queryClient = useQueryClient();
  const auth = useAuth();

  const handleProject = useCallback(
    (id) => {
      onClose?.();
      auth.setProject(id);
      queryClient.invalidateQueries({ queryKey: ["getAllJobs", id] });
    },
    [onClose, auth, queryClient]
  );

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
        {auth?.projects?.map(({ id, name }) => (
          <MenuItem
            selected={id === auth?.project}
            key={id}
            onClick={() => handleProject(id)}
            sx={{ textTransform: "capitalize" }}
          >
            {name}
          </MenuItem>
        ))}
      </MenuList>
    </Popover>
  );
};

ProjectPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
