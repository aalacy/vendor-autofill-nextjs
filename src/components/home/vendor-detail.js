import { Typography, Stack, Paper, Grid } from "@mui/material";

export const VendorDetailPanelContent = ({ row }) => {
  return (
    <Stack sx={{ py: 1, height: "100%", boxSizing: "border-box" }} direction="column">
      <Paper sx={{ flex: 1, flexWrap: "wrap", mx: "auto", width: "90%", p: 1 }}>
        <Stack direction="column" flexWrap="wrap" spacing={1} sx={{ height: 1 }}>
          <Grid container>
            <Grid item md={6} sm={12}>
              <Typography variant="h6" color="textSecondary" mb={2}>
                Vendor Information
              </Typography>
              <Typography variant="body1">
                <b>Email:</b>&nbsp;{row.email}
              </Typography>
              <Typography variant="body1">
                <b>Phone:</b>&nbsp;{row.phone}
              </Typography>
              <Typography variant="body1">
                <b>Address:</b>&nbsp;{row.address}
              </Typography>
              <Typography variant="body1">
                <b>Website:</b>&nbsp;{row.website}
              </Typography>
              <Typography variant="body1">
                <b>Category:</b>&nbsp;{row.category}
              </Typography>
            </Grid>
            <Grid item md={6} sm={12}>
              <Typography variant="body1">
                <b>Hours:</b>
                <pre>{row.hours}</pre>
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </Paper>
    </Stack>
  );
};