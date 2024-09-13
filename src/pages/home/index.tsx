import { Box } from "@mui/material";
import {
  AdditionalServicesCard,
  ApplePayBlock,
  CurrencyExchangeWidget,
  OfflineExchangeLocationsCard,
  RatesBlock,
} from "../../components/home";

export function Home() {
  return (
    <Box sx={{ display: "grid", gap: "25px", marginTop: "30px" }}>
      <CurrencyExchangeWidget />
      <RatesBlock />
      <ApplePayBlock />
      <AdditionalServicesCard />
      <OfflineExchangeLocationsCard />
    </Box>
  );
}
