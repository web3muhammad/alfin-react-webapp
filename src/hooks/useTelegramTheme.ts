import { useState, useEffect } from "react";
import { getTheme } from "../theme/theme";
import { Theme } from "@mui/material/styles";

// Function to check if Telegram's theme is dark
const isDarkTheme = () => Telegram.WebApp.colorScheme === "dark";

// Function to set Telegram-specific theme parameters
const setTelegramThemeParams = (isDarkMode: boolean) => {
  const headerColor = isDarkMode
    ? "rgba(24, 34, 45, 1)"
    : "rgba(239, 239, 243, 1)";

  // Set Telegram's background color
  Telegram.WebApp.setHeaderColor(headerColor);
  Telegram.WebApp.setBackgroundColor(headerColor);
};

export const useTelegramTheme = (): Theme => {
  const [theme, setTheme] = useState<Theme>(getTheme(isDarkTheme()));

  useEffect(() => {
    const handleThemeChange = () => {
      const isDarkMode = isDarkTheme();
      setTheme(getTheme(isDarkMode));
      setTelegramThemeParams(isDarkMode);
    };

    // Initial theme setup
    handleThemeChange();

    // Listen for Telegram theme changes
    Telegram.WebApp.onEvent("themeChanged", handleThemeChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      Telegram.WebApp.offEvent("themeChanged", handleThemeChange);
    };
  }, []);

  return theme;
};
