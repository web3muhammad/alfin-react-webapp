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
      main: "rgba(46, 166, 255, 1)", // Dark theme primary color
    },
    background: {
      default: "rgba(24, 34, 45, 1)", // Dark theme background color
    },
    secondary: {
      main: "rgba(33, 48, 63, 1)",
      light: "rgba(42, 61, 80, 1)",
    },
    text: {
      primary: "#FFFFFF", // Dark theme text color
    },
  },
});

// Function to get the appropriate theme based on Telegram's color scheme
export const getTheme = (isDarkMode: boolean): Theme => {
  return createTheme(isDarkMode ? darkTheme : lightTheme);
};
