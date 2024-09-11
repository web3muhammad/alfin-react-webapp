// src/components/WelcomeNavBlock/WelcomeNavBlock.tsx
import React from "react";
import { Box, Typography } from "@mui/material";

import DiscountBadge from "./DiscountBadge";
import { useTelegram } from "../../hooks";
import SegmentedProgressBar from "../progress-bar/ProgressBar";
import { Navigation } from "./Navigation";

export function UserWelcomeBanner() {
  const { user } = useTelegram();
  const moneyValue = 600000;

  const getDiscount = () => {
    if (moneyValue >= 1000000) return "-10";
    if (moneyValue >= 500000) return "-7";
    if (moneyValue >= 100000) return "-5";
    return "0";
  };

  return (
    <Box>
      <Typography
        sx={{ fontSize: "24px", fontWeight: "600", textAlign: "center" }}
      >
        Добро пожаловать, {user?.first_name}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: ".5rem",
        }}
      >
        <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
          Вы обернули {moneyValue.toLocaleString()}₽
        </Typography>
        <DiscountBadge discount={getDiscount()} />
      </Box>
      <SegmentedProgressBar value={moneyValue} />
      <Navigation />
    </Box>
  );
}
