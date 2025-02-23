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
          fontFamily: `"Inter", system-ui`,
          fontSize: 14,
          letterSpacing: "-0,5px",
          color:
            theme.palette.mode === "dark"
              ? theme.palette.text.primary // White text for dark mode
              : theme.palette.text.primary, // Dark text for light mode
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          input: {
            border: "none",
            fontSize: "14px",
          },
          "& fieldset": { border: "none" },
        },
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
