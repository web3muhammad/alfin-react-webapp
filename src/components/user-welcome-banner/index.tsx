// src/components/WelcomeNavBlock/WelcomeNavBlock.tsx
import { Box, Typography } from "@mui/material";

import { useTelegram } from "../../hooks";
import { SegmentedProgressBar, Title } from "../shared";
import { DiscountBadge, Navigation } from "./components";

export function UserWelcomeBanner() {
  const { user } = useTelegram();
  const moneyValue = 750000;

  const getDiscount = () => {
    if (moneyValue >= 1000000) return "-10";
    if (moneyValue >= 500000) return "-7";
    if (moneyValue >= 100000) return "-5";
    return "0";
  };

  return (
    <Box>
      <Title sx={{ paddingBottom: "0" }}>
        Добро пожаловать, {user?.first_name}
      </Title>

      {moneyValue <= 0 && (
        <Typography
          sx={{
            fontSize: "13px",
            maxWidth: "70%",
            margin: "0 auto",
            fontWeight: 400,
            textAlign: "center",
            opacity: ".5",
          }}
        >
          Начните обменивать валюту, чтобы получить персональную скидку
        </Typography>
      )}

      {moneyValue > 0 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: ".5rem",
          }}
        >
          <Typography
            sx={{ fontSize: "14px", fontWeight: 400, textAlign: "center" }}
          >
            Вы обернули {moneyValue.toLocaleString()}₽
          </Typography>

          <DiscountBadge discount={getDiscount()} />
        </Box>
      )}

      <SegmentedProgressBar value={moneyValue} />

      <Navigation />
    </Box>
  );
}
