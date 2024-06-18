import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Roboto } from "next/font/google";

import { AuthConsumer, AuthProvider } from "src/contexts/auth-context";
import { useNProgress } from "src/hooks/use-nprogress";
import { createTheme } from "src/theme";
import { createEmotionCache } from "src/utils/create-emotion-cache";

import "simplebar-react/dist/simplebar.min.css";
import "../theme/global.css";

import ConfirmDialog from "src/components/common/confirm";

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const queryClient = new QueryClient();

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (
    <CacheProvider value={emotionCache} className={roboto.className}>
      <Head>
        <title>Prodbot</title>
        <meta name="viewport" content="initial-scale=1, width=device-width, user-scalable=no" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Toaster position="top-center" />
              <AuthConsumer>
                {(auth) =>
                  auth.isLoading ? (
                    <SplashScreen />
                  ) : (
                    getLayout(
                      <>
                        <Component {...pageProps} />
                        {auth.confirmMessage?.open && <ConfirmDialog {...auth.confirmMessage} />}
                      </>,
                    )
                  )
                }
              </AuthConsumer>
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
