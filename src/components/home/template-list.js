import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useEffect, useMemo, useState } from "react";
import { Button, CircularProgress, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import {
  Clear,
  DocumentScanner as ViewIcon,
  VerifiedOutlined as W9Icon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { VendorService } from "src/services";
import { SearchBox } from "../widgets/search-box";
import { useAuth } from "src/hooks/use-auth";

export const TemplateList = ({ templates, vendors, onClose }) => {
  const [checked, setChecked] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const queryClient = useQueryClient();

  const { project } = useAuth();

  useEffect(() => {
    if (!vendors) return;
    setChecked(vendors.map(({ vendor_id }) => vendor_id));
  }, [vendors]);

  useEffect(() => {}, [query]);

  const filteredTemplates = useMemo(() => {
    if (!templates) return [];
    return templates.filter(
      ({ name, address }) =>
        name.match(new RegExp(query, "i")) || address.match(new RegExp(query, "i")),
    );
  }, [query, templates]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleClear = () => {
    setChecked([]);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setChecked(templates.map(({ id }) => id));
    } else {
      handleClear();
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const vendorIds = vendors.map(({ vendor_id }) => vendor_id);
      const created = checked.filter((id) => !vendorIds.includes(id));
      const removed = vendorIds.filter((x) => !checked.includes(x));
      const removed_vendors = vendors
        .filter(({ vendor_id }) => removed.includes(vendor_id))
        .map(({ id }) => id);
      const {
        data: { detail },
      } = await VendorService.addMyVendors(created, removed_vendors, project.id);
      toast.success(detail);
      queryClient.invalidateQueries({ queryKey: ["getAllVendors", project.id] });
      onClose();
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {};

  return (
    <>
      <SearchBox query={query} setQuery={setQuery} handleClick={handleSearchClick} />
      <FormControlLabel
        label="Select All"
        control={
          <Checkbox
            checked={checked?.length === templates?.length}
            indeterminate={!!checked?.length && checked.length < templates?.length}
            onChange={handleSelectAll}
          />
        }
      />
      <List sx={{ width: "100%", maxHeight: 450, overflow: "auto" }}>
        {filteredTemplates.map(({ id, name, address, w9, forms }) => {
          const labelId = `template-list-item-${id}`;

          return (
            <ListItem
              key={id}
              disablePadding
              secondaryAction={
                <Stack direction="row" spacing={1}>
                  <Tooltip title="W9">
                    <W9Icon color={w9 ? "primary" : "inherit"} />
                  </Tooltip>
                  <Tooltip
                    title={`${forms?.length || 0} Forms`}
                    color={forms ? "primary" : "inherit"}
                  >
                    <ViewIcon />
                  </Tooltip>
                </Stack>
              }
            >
              <ListItemButton role={undefined} onClick={handleToggle(id)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={name} secondary={address} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Stack direction="row" alignItems="center" mt={3}>
        <Stack direction="row" spacing={2} mr="auto">
          <Button
            startIcon={loading ? <CircularProgress size={20} /> : null}
            disabled={!!!checked?.length}
            variant="contained"
            onClick={handleSubmit}
          >
            Save
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          {checked?.length > 0 && <Typography>{checked?.length} Selected</Typography>}
          <Tooltip title="Clear Selection">
            <IconButton color="success" onClick={handleClear}>
              <Clear />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </>
  );
};
