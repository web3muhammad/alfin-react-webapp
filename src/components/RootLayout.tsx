import { Box, ThemeProvider, Typography } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useTelegram, useTelegramTheme } from "../hooks";

export function RootLayout() {
  const theme = useTelegramTheme();
  const { tg, user } = useTelegram();
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
            maxWidth: "360px",
            margin: "0 auto",
            padding: "10px",
          }}
        >
          <Outlet />
          <Typography
            sx={{ fontSize: "24px", fontWeight: "600", textAlign: "center" }}
          >
            Добро пожаловать, {user?.first_name}
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
