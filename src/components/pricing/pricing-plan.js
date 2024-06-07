import propTypes from "prop-types";
import { Box, Button, Divider, Paper, Typography, CircularProgress, Chip } from "@mui/material";
import { Check as CheckIcon } from "@mui/icons-material";

export const PricingPlan = (props) => {
  const {
    loading,
    handleCheckout,
    isCurrent,
    cta,
    currency,
    description,
    features,
    image,
    name,
    popular,
    price,
    label,
    sx,
    ...other
  } = props;

  return (
    <Paper raised="true">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          background: "paper.default",
          border: isCurrent ? "1px solid yellow" : "none",
          borderRadius: 1,
          ...sx,
        }}
        {...other}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
            <Typography variant="h4">
              {currency}
              {price}
            </Typography>
            <Typography
              color="textSecondary"
              textTransform="uppercase"
              sx={{
                alignSelf: "flex-end",
                ml: 1,
              }}
              variant="subtitle2"
            >
              / {label}
            </Typography>
            {isCurrent && <Chip label="Current" color="success" size="small" />}
          </Box>
          <Typography sx={{ mt: 2 }} variant="h6">
            {name}
          </Typography>
          <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
            {description}
          </Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            p: 3,
          }}
        >
          {features.map((feature) => (
            <Box
              key={feature}
              sx={{
                alignItems: "center",
                display: "flex",
                "& + &": {
                  mt: 2,
                },
              }}
            >
              <CheckIcon fontSize="small" sx={{ color: "text.primary" }} />
              <Typography
                sx={{
                  fontWeight: 500,
                  ml: 2,
                }}
                variant="body2"
              >
                {feature}
              </Typography>
            </Box>
          ))}
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 6,
            }}
          >
            <Button
              fullWidth
              variant={popular ? "contained" : "outlined"}
              onClick={handleCheckout}
              color="primary"
              startIcon={loading ? <CircularProgress size={24} /> : null}
              disabled={loading}
            >
              {cta}
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

PricingPlan.propTypes = {
  cta: propTypes.string.isRequired,
  currency: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  features: propTypes.array.isRequired,
  image: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  popular: propTypes.bool,
  price: propTypes.number.isRequired,
  sx: propTypes.object,
};
