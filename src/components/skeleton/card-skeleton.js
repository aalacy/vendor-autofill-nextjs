import { Skeleton, Box } from "@mui/material";

export const CardSkeleton = () => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        py: 5,
      }}
    >
      {Array.from({ length: 6 }, (_, i) => i + 1).map((item) => (
        <Skeleton key={item} variant="rounded" width={230} height={218} />
      ))}
    </Box>
  );
};
