import { Box } from "@mui/material";
import {
  AdditionalServicesCard,
  Aml,
  ApplePayBlock,
  CurrencyExchangeWidget,
  ForeignCardBlock,
  OfflineExchangeLocationsCard,
  RatesBlock,
  ServicesPayment,
  SwiftBlock,
} from "../../components/pages/home";
import { UserWelcomeBanner } from "../../components/shared";
import { useTheme } from "@mui/material/styles";
import { useTelegram } from "../../hooks";

export function Home() {
  const theme = useTheme();
  const { tg } = useTelegram();
  const isMobile =
    tg.platform !== "tdesktop" &&
    tg.platform !== "weba" &&
    tg.platform !== "macos";
  return (
    <Box
      sx={{
        display: "grid",
        gap: "25px",
        marginTop: isMobile ? "100px" : "200px",
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
            paddingBottom: isMobile ? "0px" : "40px",
            width: isMobile ? "120px" : "145px",
            height: "auto",
          }}
        />
      </Box>
      <CurrencyExchangeWidget />
      <RatesBlock />
      <Box
        sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}
      >
        <ServicesPayment />
        <Aml />
        <SwiftBlock />
        <ForeignCardBlock />
      </Box>

      <ApplePayBlock />
      <AdditionalServicesCard />
      <OfflineExchangeLocationsCard />
    </Box>
  );
}
