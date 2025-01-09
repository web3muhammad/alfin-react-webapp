import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { ErrorSnackbarIcon, SuccessSnackbarIcon } from "./icons";
import { InfoRounded } from "@mui/icons-material";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError() {
        enqueueSnackbar("Что-то пошло не так, попробуйте позже", {
          variant: "error",
        });
      },
    },
    mutations: {
      onError() {
        enqueueSnackbar("Что-то пошло не так, попробуйте позже", {
          variant: "error",
        });
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <QueryClientProvider client={queryClient}>
    <SnackbarProvider
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      autoHideDuration={2500}
      disableWindowBlurListener
      preventDuplicate
      style={{
        backgroundColor: "rgba(41, 41, 41, 1)",
        fontFamily: '"Inter",system-ui',
        borderRadius: "10px",
        padding: "6px 12px",
        fontSize: "14px",
        fontWeight: "500",
      }}
      iconVariant={{
        success: <SuccessSnackbarIcon />,
        error: <ErrorSnackbarIcon />,
        warning: (
          <InfoRounded sx={{ marginRight: "5px", color: "rgb(50 158 255)" }} />
        ),
      }}
    >
      <App />
    </SnackbarProvider>
  </QueryClientProvider>
);
