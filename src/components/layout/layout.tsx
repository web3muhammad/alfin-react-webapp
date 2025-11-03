import { Box, Fade, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useTelegram, useTelegramTheme } from "../../hooks";
import { getAccessToken } from "../../services/login";
import { Navigation } from "./Navigation";
import { NavigationProvider } from "../../contexts/NavigationContext";
import { LevelProgressBarBlock } from "../shared/ProgressBar/LevelProgressBarBlock";
import { isMobileWebApp } from "../../utils";

export function RootLayout() {
  const theme = useTelegramTheme();
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
    tg.expand();
    tg.setBackgroundColor(
      theme.palette.mode === "dark"
        ? "rgba(28, 28, 29, 0.75)"
        : "rgba(255, 255, 255, 0.75)"
    );

    // Request fullscreen only on mobile devices
    if (isMobileWebApp) {
      try {
        tg.requestFullscreen();
      } catch (error) {
        console.warn("Fullscreen request not supported:", error);
      }
    }
  }, [tg, theme.palette.mode, isMobileWebApp]);

  // Scroll to top after navigating to a new page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <NavigationProvider>
        <Box
          sx={{
            minHeight: "100vh",
            background: theme.palette.background.default,
          }}
        >
          {/* <LevelProgressBarBlock /> */}
          <Fade in>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                padding: "15px 22px",
                margin: "0 auto",
                paddingTop: isMobileWebApp ? "100px" : "20px",
              }}
            >
              <Outlet />
              <Navigation />
            </Box>
          </Fade>
        </Box>
      </NavigationProvider>
    </ThemeProvider>
  );
}
