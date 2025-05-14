import { createTheme } from "@mui/material/styles";

export const baseThemeParameters = createTheme({
  palette: {
    mode: "light",
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
              ? theme.palette.text.primary
              : theme.palette.text.primary,
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
