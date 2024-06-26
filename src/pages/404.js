import Head from "next/head";
import NextLink from "next/link";
import ArrowLeftIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";

const Page = () => (
  <>
    <Head>
      <title>404 | Prodbot</title>
    </Head>
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: "center",
            }}
          >
            <Image
              priority
              height={400}
              width={400}
              alt="404 page"
              src="/assets/errors/error-404.png"
              sx={{
                display: "inline-block",
                maxWidth: "100%",
              }}
            />
          </Box>
          <Typography align="center" sx={{ mb: 3 }} variant="h3">
            404: The page you are looking for isn’t here
          </Typography>
          <Typography align="center" color="text.secondary" variant="body1">
            You either tried some shady route or you came here by mistake. Whichever it is, try
            using the navigation
          </Typography>
          <Button
            component={NextLink}
            href="/"
            startIcon={<ArrowLeftIcon />}
            sx={{ mt: 3 }}
            variant="contained"
          >
            Go back to dashboard
          </Button>
        </Box>
      </Container>
    </Box>
  </>
);

export default Page;
