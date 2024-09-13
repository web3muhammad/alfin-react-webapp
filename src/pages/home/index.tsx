import { Box } from "@mui/material";
import {
  AdditionalServicesCard,
  ApplePayBlock,
  CurrencyExchangeWidget,
  OfflineExchangeLocationsCard,
  RatesBlock,
} from "../../components/pages/home";
import { UserWelcomeBanner } from "../../components/user-welcome-banner";
import { useTelegram } from "../../hooks";

export function Home() {
  return (
    <Box sx={{ display: "grid", gap: "25px", marginTop: "10px" }}>
      <UserWelcomeBanner />
      <CurrencyExchangeWidget />
      <RatesBlock />
      <ApplePayBlock />
      <AdditionalServicesCard />
      <OfflineExchangeLocationsCard />
    </Box>
  );
}
