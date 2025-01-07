import { Box, Fade, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTelegram, useTelegramTheme } from "../../hooks";
import { getAccessToken } from "../../services/login";
import { useSnackbar } from "notistack";

export function RootLayout() {
  const theme = useTelegramTheme();
  const { tg } = useTelegram();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    tg.ready();
    tg.expand();
    tg.setBackgroundColor("rgba(239, 239, 243, 1)");

    // Only showing the back button if user is not on the homepage
    if (pathname !== "/") {
      tg.BackButton.show();
    } else {
      tg.BackButton.hide();
    }

    const handleBackButtonClick = () => {
      navigate(-1);
    };

    tg.offEvent("backButtonClicked", handleBackButtonClick); // Removing any existing listeners before adding a new one
    tg.onEvent("backButtonClicked", handleBackButtonClick);

    return () => {
      tg.offEvent("backButtonClicked", handleBackButtonClick);
    };
  }, [tg, navigate, pathname]);

  // Scroll to top after navigating to a new page
  useEffect(() => {
    window.scrollTo(0, 0);
    getAccessToken();
  }, [location.pathname]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          background: theme.palette.background.default,
        }}
      >
        <Fade in>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              padding: "15px 22px",
              margin: "0 auto",
              maxWidth: "400px",
            }}
          >
            <Outlet />
          </Box>
        </Fade>
      </Box>
    </ThemeProvider>
  );
}
