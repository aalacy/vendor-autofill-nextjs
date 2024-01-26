import { Skeleton, Box } from "@mui/material";

export const TableSkeleton = (props) => {
  const { height } = props;

  return (
    <Box
      sx={{
        width: "80%",
        minHeight: height || 100,
        height: "100%",
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
      }}
    >
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </Box>
  );
};
