import {
  Card,
  InputBase,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  Stack,
  MenuItem,
  Select,
  IconButton,
  Button,
  Tooltip,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import {
  Search as SearchIcon,
  GridView as GridViewIcon,
  ViewList as ListIcon,
  NorthEast as TriggerIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const TriggerIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "32ch",
      "&:focus": {
        width: "40ch",
      },
    },
  },
}));

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

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const handleClick = () => {
    queryClient.invalidateQueries({ queryKey: ["getAdminVendors"] });
  };

  return (
    <Card sx={{ p: 2 }}>
      <Stack useFlexGap flexWrap="wrap" justifyContent="space-between" direction="row" spacing={2}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            value={query}
            onChange={handleSearch}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton color="primary" onClick={handleClick} sx={{ mr: 1 }}>
            <TriggerIcon />
          </IconButton>
        </Search>
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
