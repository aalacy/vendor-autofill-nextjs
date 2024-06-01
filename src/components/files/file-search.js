import {
  Card,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  Stack,
  MenuItem,
  Select,
  Button,
  Tooltip,
} from "@mui/material";
import {
  GridView as GridViewIcon,
  ViewList as ListIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import { SearchBox } from "../widgets/search-box";

export const FileSearch = ({
  alignment,
  setAlignment,
  sortby,
  setSortby,
  query,
  setQuery,
  downloadFiles,
  folders,
}) => {
  const queryClient = useQueryClient();

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const handleChange = (event) => {
    setSortby(event.target.value);
  };

  const handleClick = () => {
    queryClient.invalidateQueries({ queryKey: ["getAdminVendors"] });
  };

  return (
    <Card sx={{ p: 2 }}>
      <Stack useFlexGap flexWrap="wrap" justifyContent="space-between" direction="row" spacing={2}>
        <SearchBox query={query} setQuery={setQuery} handleClick={handleClick} />
        <Stack direction="row" spacing={2}>
          <Tooltip title="Download All Files">
            <Button
              disabled={folders?.length > 0}
              onClick={() => downloadFiles(folders)}
              variant="outlined"
              color="inherit"
              size="small"
            >
              <DownloadIcon />
            </Button>
          </Tooltip>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <Tooltip title="Grid View">
              <ToggleButton value="card" aria-label="card view">
                <GridViewIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="List View">
              <ToggleButton value="list" aria-label="list view">
                <ListIcon />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
          <FormControl>
            <Select
              labelId="file-search-sort-label"
              id="file-search-sort"
              value={sortby}
              onChange={handleChange}
            >
              <MenuItem value="Latest">Latest</MenuItem>
              <MenuItem value="Oldest">Oldest</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </Card>
  );
};
