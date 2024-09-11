import { Box, ThemeProvider, Typography } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useTelegram, useTelegramTheme } from "../hooks";
import { UserWelcomeBanner } from "./user-welcome-banner/UserWelcomeBanner";

export function RootLayout() {
  const theme = useTelegramTheme();
  const { tg } = useTelegram();
  const navigate = useNavigate();

  useEffect(() => {
    tg.ready();
    tg.expand();

    tg.onEvent("backButtonClicked", () => {
      navigate("/");
      tg.BackButton.hide();
    });
  }, [navigate, tg]);

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
          <UserWelcomeBanner />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
