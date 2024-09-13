import { Box } from "@mui/material";
import {
  AdditionalServicesCard,
  ApplePayBlock,
  CurrencyExchangeWidget,
  OfflineExchangeLocationsCard,
  RatesBlock,
} from "../../components/home";
import { UserWelcomeBanner } from "../../components/user-welcome-banner";

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
