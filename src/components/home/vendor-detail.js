import { Typography, Stack, Paper, Grid, Button, Box } from "@mui/material";
import MyGoogleMap from "./my-google-map";

export const VendorDetailPanelContent = ({ row }) => {

  const renderItem = (label, text) => (
    <Box sx={{ display: 'flex', mb: 1 }}>
      <b>{label}:</b><Typography color="#8ab4f8" sx={{ ml: 1, whiteSpace: "pre"}}>{text}</Typography>
    </Box>
  )

  return (
    <Stack sx={{ py: 1, height: "100%", boxSizing: "border-box" }} direction="column">
      <Paper sx={{ flex: 1, flexWrap: "wrap", mx: "auto", width: "99%", p: 1 }}>
        <Stack direction="column" flexWrap="wrap" spacing={1} sx={{ height: 1 }}>
          <Grid container>
            <Grid item md={5} sm={12}>
              <Typography variant="h6" color="textSecondary" mb={2}>
                Vendor Information
              </Typography>
              <MyGoogleMap address={row.address}/>
            </Grid>
            <Grid item md={7} sm={12}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2, mt: 1 }}>
                <Button variant="outlined" color="inherit" href={row.website} size="small" target="_blank">
                  Website
                </Button>
                <Button variant="outlined" color="inherit" href={`mailto:${row.email}`} size="small">
                  Email
                </Button>
                <Button variant="outlined" color="inherit" href={`tel:${row.phone}`} size="small">
                  Call
                </Button>
              </Box>
              {renderItem("Address", row.address)}
              {renderItem("Phone", row.phone)}
              {renderItem("Email", row.email)}
              {renderItem("Hours", row.hours)}
              {renderItem("Category", row.category)}
            </Grid>
          </Grid>
        </Stack>
      </Paper>
    </Stack>
  );
};