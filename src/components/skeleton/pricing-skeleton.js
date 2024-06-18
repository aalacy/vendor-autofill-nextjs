import { Skeleton, Box } from "@mui/material";

export const PricingSkeleton = () => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 2,
        py: 5,
      }}
    >
      <Skeleton variant="rounded"
width={100}
height={58} />
      <Skeleton variant="rounded"
width={230}
height={218} />
    </Box>
  );
};
