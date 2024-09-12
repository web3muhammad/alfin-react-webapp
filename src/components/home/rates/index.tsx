import { Box } from "@mui/material";
import { RateCard } from "./components/RateCard";

export function RatesBlock() {
  const rateData = [
    { code: "TRY", name: "Лира", color: "#FF3C14", value: 2.89 },
    { code: "USDT", name: "Tether", color: "#008F8E", value: 94.2 },
    { code: "AED", name: "Дирхам", color: "#CE853B", value: 26.02 },
    { code: "RUB", name: "Рубль", color: "#1463FF", value: 4.93 },
    { code: "SAR", name: "Риал", color: "#2FBC2F", value: 26.32 },
  ];
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "secondary.main",
        borderRadius: "16px",
        padding: "16px",
        display: "grid",
        gridTemplateColumns: "50% 50%",
        columnGap: "10px",
        rowGap: "12px",
      }}
    >
      {rateData.map((rate) => (
        <RateCard
          key={rate.code}
          code={rate.code}
          name={rate.name}
          value={rate.value}
          color={rate.color}
        />
      ))}
    </Box>
  );
}
