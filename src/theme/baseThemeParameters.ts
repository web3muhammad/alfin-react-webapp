import { createTheme } from "@mui/material/styles";

// Create the theme with typography overrides based on the theme mode
export const baseThemeParameters = createTheme({
  palette: {
    mode: "light", // Set default theme mode; it will change dynamically later
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontFamily: "Inter",
          fontSize: 14,
          color:
            theme.palette.mode === "dark"
              ? theme.palette.text.primary // White text for dark mode
              : theme.palette.text.primary, // Dark text for light mode
        }),
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          color: "#fff !important",
        },
      },
    },
  },
});
