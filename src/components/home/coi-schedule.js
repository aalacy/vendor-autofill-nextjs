import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  CircularProgress,
  FormControlLabel,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { VendorService } from "src/services";
import { SearchBox } from "../widgets/search-box";
import { useAuth } from "src/hooks/use-auth";
import { QUEUED } from "src/utils/constants";

export default ({ vendors, onClose }) => {
  const [checked, setChecked] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);

  const { project } = useAuth();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!vendors) return;

    const _items = [];
    for (const vendor of vendors) {
      if (vendor.coi.status !== QUEUED) continue;

      _items.push({
        name: vendor.vendor.name,
        address: vendor.vendor.address,
        coi_id: vendor.coi_id,
      });
    }
    setItems(_items);
  }, [vendors]);

  const filteredItems = useMemo(() => {
    if (!items) return [];
    return items.filter(
      ({ name, address }) =>
        name.match(new RegExp(query, "i")) || address.match(new RegExp(query, "i")),
    );
  }, [query, items]);

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
      setChecked(filteredItems.map(({ coi_id }) => coi_id));
    } else {
      handleClear();
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const {
        data: { detail },
      } = await VendorService.requestCOI(checked);
      toast.success(detail);
      queryClient.invalidateQueries({ queryKey: ["getAllVendors", project?.id] });
      onClose();
    } catch (err) {
      toast.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchBox query={query} setQuery={setQuery} />
      <FormControlLabel
        label="Select All"
        control={
          <Checkbox
            checked={checked.length > 0 && checked?.length === filteredItems?.length}
            indeterminate={!!checked?.length && checked.length < filteredItems?.length}
            onChange={handleSelectAll}
          />
        }
        sx={{ mt: 2 }}
      />
      <List sx={{ width: "100%", maxHeight: 450, overflow: "auto" }}>
        {filteredItems.map(({ coi_id, name, address }) => {
          const labelId = `coi-request-list-item-${coi_id}`;

          return (
            <ListItem key={coi_id} disablePadding>
              <ListItemButton role={undefined} onClick={handleToggle(coi_id)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(coi_id) !== -1}
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
        {filteredItems.length === 0 && (
          <ListItem>
            <Typography textAlign="center" fontWeight="bold" width={1}>
              NO QUEUED COIs
            </Typography>
          </ListItem>
        )}
      </List>

      <Stack direction="row" alignItems="center" mt={5}>
        <Stack direction="row" spacing={2} mr="auto">
          <Button
            startIcon={loading ? <CircularProgress size={20} /> : null}
            disabled={!!!checked?.length}
            variant="contained"
            onClick={handleSubmit}
          >
            Request
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
