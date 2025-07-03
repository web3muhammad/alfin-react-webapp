import React from "react";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { Block, Button } from "../../../shared";
import { Order } from "../../../../services/orders/interface";
import { useNavigate } from "react-router-dom";

export const TransactionCard: React.FC<Order> = ({
  id,
  status,
  sell_amount,
  sell_currency,
  buy_amount,
  buy_currency,
  rate,
  created_at,
  payment_method,
  buy_amount_without_discount,
  discount_percentage,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Block>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", gap: "5px" }}>
            <Typography>Покупка</Typography>
            <Typography sx={{ color: "primary.main" }} component="span">
              #{id}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: "10px", opacity: ".5" }}>
            {created_at}
          </Typography>
        </Box>

        <Box
          sx={{
            background:
              status === "IN_PROGRESS"
                ? "rgba(234, 194, 0, 0.1)"
                : status === "SUCCEEDED"
                ? "rgba(0, 234, 0, 0.1)"
                : "rgba(234, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "6px",
            padding: "5px",
          }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "12px",
              color:
                status === "IN_PROGRESS" || status === "NEW"
                  ? "rgba(234, 194, 0, 1)"
                  : status === "SUCCEEDED"
                  ? "rgba(0, 234, 0, 1)"
                  : "rgba(234, 0, 0, 1)",
            }}
          >
            {status === "IN_PROGRESS" || status === "NEW"
              ? "В работе"
              : status === "SUCCEEDED"
              ? "Завершено"
              : "Отменено"}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ margin: "12px -16px" }} />

      <Box sx={{ display: "grid", gap: "8px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ opacity: ".5" }}>Получили</Typography>
          <Typography sx={{ fontSize: "18px" }}>
            {buy_amount + " " + buy_currency}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ opacity: ".5" }}>Курс</Typography>
          <Typography>{rate}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ opacity: ".5" }}>Отдали</Typography>
          <Typography>{sell_amount + " " + sell_currency}</Typography>
        </Box>
      </Box>

      {status === "SUCCEEDED" && (
        <Button
          onClick={() =>
            navigate("/payment", {
              state: {
                selectedMainCurrency: buy_currency,
                selectedExchangeCurrency: sell_currency,
                inputAmount1: sell_amount,
                inputAmount2: buy_amount,
                exchangeRate: rate,
                paymentType: payment_method,
                buyAmountWithoutPercentage: buy_amount_without_discount,
                discountPercentage: discount_percentage,
              },
            })
          }
          sx={{
            backgroundColor: "secondary.light",
            color: theme.palette.mode === "dark" ? "#fff" : "unset",
            marginTop: "1rem",
          }}
        >
          Повторить транзакцию
        </Button>
      )}
    </Block>
  );
};
