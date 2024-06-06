import PropTypes from "prop-types";
import NextLink from "next/link";
import { Box, Container, Card } from "@mui/material";

import { Logo } from "src/components/logo";

export const Layout = (props) => {
  const { children } = props;

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flex: "1 1 auto",
      }}
    >
      <Container
        fixed
        maxWidth="sm"
        sx={{
          py: {
            xs: "30px",
            md: "60px",
          },
        }}
      >
        <Card elevation={16} sx={{ p: 4 }}>
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: "fixed",
              top: 0,
              width: "100%",
            }}
          >
            <Box
              component={NextLink}
              href="/"
              sx={{
                display: "inline-flex",
                height: 32,
                width: 32,
              }}
            >
              <Logo />
            </Box>
          </Box>
          {children}
        </Card>
      </Container>
    </Box>
  );
};

Layout.prototypes = {
  children: PropTypes.node,
};
