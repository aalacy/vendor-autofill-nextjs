import { IconButton, InputBase } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Search as SearchIcon, NorthEast as TriggerIcon } from "@mui/icons-material";

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

export const SearchBox = ({ query, setQuery, handleClick }) => {
  const handleSearch = (event) => {
    setQuery(event.target.value);
  };
  return (
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
      <IconButton color="primary"
onClick={handleClick}
sx={{ mr: 1 }}>
        <TriggerIcon />
      </IconButton>
    </Search>
  );
};
