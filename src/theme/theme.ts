import { createTheme, Theme } from "@mui/material/styles";
import { baseThemeParameters } from "./baseThemeParameters";

// Define the light theme
const lightTheme = createTheme({
  ...baseThemeParameters,
  palette: {
    mode: "light",
    primary: {
      main: "rgba(51, 119, 255, 1)", // Light theme primary color
    },
    secondary: {
      main: "rgba(255, 255, 255, 1)",
      light: "#EFEFF3",
    },
    background: {
      default: "rgba(239, 239, 243, 1)", // Light theme background color
    },
    text: {
      primary: "#000000", // Light theme text color
    },
  },
});

// Define the dark theme
const darkTheme = createTheme({
  ...baseThemeParameters,
  palette: {
    mode: "dark",
    primary: {
      main: "#3377FF", // Dark theme primary color
    },
    background: {
      default: "#1C1C1D", // Dark theme background color
      paper: "#2C2C2E", // Color for blocks/cards
    },
    secondary: {
      main: "#2C2C2E",
      light: "#3C3C3F",
    },
    divider: "#3C3C3F", // Color for dividers
    text: {
      primary: "#FFFFFF", // Dark theme text color
    },
  },
});

// Function to get the appropriate theme based on Telegram's color scheme
export const getTheme = (isDarkMode: boolean): Theme => {
  return createTheme(isDarkMode ? darkTheme : lightTheme);
};
