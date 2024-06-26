import NextLink from "next/link";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import ChevronUpDownIcon from "@mui/icons-material/UnfoldLess";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Logo } from "src/components/logo";
import { Scrollbar } from "src/components/common/scrollbar";
import { items } from "./config";
import { SideNavItem } from "./side-nav-item";
import { useAuth } from "src/hooks/use-auth";
import { usePopover } from "src/hooks/use-popover";
import { ProjectPopover } from "./project-popover";

export const SideNav = (props) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const { isAdmin, project } = useAuth();
  const projectPopover = usePopover();

  const content = (
    <>
      <Scrollbar
        sx={{
          height: "100%",
          "& .simplebar-content": {
            height: "100%",
          },
          "& .simplebar-scrollbar:before": {
            background: "neutral.400",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box sx={{ p: 3 }}>
            <Box
              component={NextLink}
              href="/"
              sx={{
                display: "inline-flex",
                height: 32,
                width: 32,
              }}
            >
              <Logo />
            </Box>
            <Tooltip>
              <span>
                <Button
                  variant="contained"
                  onClick={projectPopover.handleOpen}
                  ref={projectPopover.anchorRef}
                  endIcon={<ChevronUpDownIcon sx={{ color: "neutral.500" }} />}
                  sx={{ backgroundColor: "rgba(255, 255, 255, 0.04)", mt: 2 }}
                >
                  {project ? (
                    <Stack>
                      <Typography color="inherit" variant="subtitle1" textTransform="capitalize">
                        {project?.prodCoName}
                      </Typography>
                      <Typography color="neutral.400" variant="body2" textTransform="capitalize">
                        {project?.name} - {project?.jobNumber}
                      </Typography>
                    </Stack>
                  ) : (
                    <Typography color="inherit" variant="subtitle1">
                      Prodbot
                    </Typography>
                  )}
                </Button>
              </span>
            </Tooltip>
          </Box>
          <Divider sx={{ borderColor: "neutral.700" }} />
          <Box
            component="nav"
            sx={{
              flexGrow: 1,
              px: 2,
              py: 3,
            }}
          >
            <Stack
              component="ul"
              spacing={0.5}
              sx={{
                listStyle: "none",
                p: 0,
                m: 0,
              }}
            >
              {items.map((item) => {
                const active = item.path ? pathname === item.path : false;

                if (item.requireAdmin && !isAdmin) return null;

                return (
                  <SideNavItem
                    active={active}
                    disabled={item.disabled}
                    external={item.external}
                    icon={item.icon}
                    key={item.title}
                    path={item.path}
                    title={item.title}
                  />
                );
              })}
            </Stack>
          </Box>
        </Box>
      </Scrollbar>
      <ProjectPopover
        anchorEl={projectPopover.anchorRef.current}
        open={projectPopover.open}
        onClose={projectPopover.handleClose}
      />
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            color: "common.white",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
