import { Box, CircularProgress } from "@mui/material";
import { RateCard } from "./components/RateCard";
import { Block } from "../../../shared";
import { useQuery } from "react-query";
import { getCurrenciesPairs } from "../../../../services/currencies/pairs";

export function RatesBlock() {
  const rateData = [
    { code: "TRY", name: "Лира", color: "#FF3C14", value: 2.89 },
    { code: "USDT", name: "Tether", color: "#008F8E", value: 94.2 },
    { code: "AED", name: "Дирхам", color: "#CE853B", value: 26.02 },
    { code: "RUB", name: "Рубль", color: "#1463FF", value: 4.93 },
    { code: "SAR", name: "Риал", color: "#2FBC2F", value: 26.32 },
  ];

  const { data, isLoading } = useQuery({
    queryFn: () => getCurrenciesPairs({ symbol: "RUB", rates: true }),
  });

  return (
    <Block
      sx={{
        display: "grid",
        gridTemplateColumns: isLoading ? "100%" : "50% 50%",
        columnGap: "10px",
        rowGap: "12px",
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={30} />
        </Box>
      ) : (
        data?.map((rate) => (
          <RateCard
            key={rate.id}
            title={rate.title}
            rate={rate.rate}
            icon={rate.icon}
            symbol={rate.symbol}
          />
        ))
      )}
    </Block>
  );
}
