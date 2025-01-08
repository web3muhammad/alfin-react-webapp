// src/components/WelcomeNavBlock/WelcomeNavBlock.tsx
import { Box, Typography } from "@mui/material";

import { DiscountBadge, Navigation } from "./components";
import { useTelegram } from "../../../hooks";
import { SegmentedProgressBar, Title } from "..";
import { useQuery } from "react-query";
import { getUserInfo } from "../../../services/me";

export function UserWelcomeBanner() {
  const { data } = useQuery({
    queryFn: getUserInfo,
    queryKey: ["user-info"],
    refetchOnWindowFocus: false,
    onSuccess(data) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    },
  });
  const volume = data?.volume || 0;
  const getDiscount = () => {
    if (volume >= 1000000) return "-10";
    if (volume >= 500000) return "-7";
    if (volume >= 100000) return "-5";
    return "0";
  };

  return (
    <Box>
      <Title sx={{ paddingBottom: "0" }}>
        Добро пожаловать, {data?.first_name}
      </Title>

      {volume <= 0 && (
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

      {volume > 0 && (
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
            Вы обернули {volume.toLocaleString()}₽
          </Typography>

          {/* <DiscountBadge discount={getDiscount()} /> */}
        </Box>
      )}

      <SegmentedProgressBar value={volume} />

      <Navigation />
    </Box>
  );
}
