import { Box } from "@mui/material";
import {
  AdditionalServicesCard,
  Aml,
  ApplePayBlock,
  CurrencyExchangeWidget,
  OfflineExchangeLocationsCard,
  RatesBlock,
} from "../../components/pages/home";
import { UserWelcomeBanner } from "../../components/shared";
import { useTheme } from "@mui/material/styles";

export function Home() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "grid",
        gap: "25px",
        marginTop: "100px",
        marginBottom: "100px",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            theme.palette.mode === "dark"
              ? "url('/dark-theme-gradient.jpg')"
              : "url('/light-theme-gradient.jpg')",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto",
          maxHeight: "280px",
          objectFit: "contain",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src="/alfin-logo.svg"
          alt="Alfin Logo"
          sx={{
            width: "120px",
            height: "auto",
          }}
        />
      </Box>
      <CurrencyExchangeWidget />
      <RatesBlock />
      <Aml />
      <ApplePayBlock />
      <AdditionalServicesCard />
      <OfflineExchangeLocationsCard />
    </Box>
  );
}
