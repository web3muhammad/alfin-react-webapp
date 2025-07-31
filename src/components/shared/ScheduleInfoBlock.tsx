import { Box, Collapse, IconButton, Typography, useTheme } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState } from "react";
import { ScheduleInfoBlockIcon } from "../../icons";
import { Block } from "./Block";
import { useQuery } from "react-query";
import { getExchangerSchedule } from "../../services/exchanger-schedule";
import { useLocation } from "react-router-dom";

export function ScheduleInfoBlock() {
  const theme = useTheme();
  const location = useLocation();

  const { data: isOpenExchanger, isLoading } = useQuery({
    queryKey: ["exchanger-schedule"],
    queryFn: getExchangerSchedule,
    refetchInterval: 1000 * 60, // 1 minute
  });

  const isPaymentPage = location.pathname.includes("/payment");

  return (
    <Collapse in={!isOpenExchanger && !isLoading} timeout={300}>
      <Block
        sx={{
          mt: "0px",
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          bgcolor: isPaymentPage
            ? "secondary.main"
            : theme.palette.mode === "dark"
            ? "#323234"
            : "rgb(239 239 243)",
        }}
      >
        <Box
          sx={{
            minWidth: "32px",
            width: "32px",
            height: "32px",
            bgcolor: isPaymentPage
              ? theme.palette.mode === "dark"
                ? "#3C3C3F"
                : "#e0e0e0"
              : theme.palette.mode === "dark"
              ? "#3C3C3F"
              : "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
          }}
        >
          <ScheduleInfoBlockIcon />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "1.25",
              letterSpacing: "-0.5px",
            }}
          >
            Заявки, отправленные после 22:00, обрабатываются с 9:30 утра ( МСК )
          </Typography>
          <Typography
            sx={{
              fontSize: "12.5px",
              fontWeight: 400,
              opacity: 0.5,
              lineHeight: "1.25",
            }}
          >
            Оставьте заявку сейчас — менеджер свяжется с вами утром
          </Typography>
        </Box>
      </Block>
    </Collapse>
  );
}
