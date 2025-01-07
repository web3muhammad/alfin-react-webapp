import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { ErrorSnackbarIcon, SuccessSnackbarIcon } from "./icons";

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
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        autoHideDuration={1500}
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
        }}
      >
        <App />
      </SnackbarProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
