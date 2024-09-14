import { Box, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTelegram, useTelegramTheme } from "../../hooks";

export function RootLayout() {
  const theme = useTelegramTheme();
  const { tg } = useTelegram();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    tg.ready();
    tg.expand();

    if (location.pathname !== "/") {
      tg.BackButton.show();
    } else {
      tg.BackButton.hide();
    }

    const handleBackButtonClick = () => {
      navigate(-1);
    };

    tg.onEvent("backButtonClicked", handleBackButtonClick);

    return () => {
      tg.offEvent("backButtonClicked", handleBackButtonClick);
    };
  }, [tg, navigate, location.pathname]);

  // Scroll to the top after navigating
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          background: theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "393px",
            margin: "0 auto",
            padding: "15px",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
