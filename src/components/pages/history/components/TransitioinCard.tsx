import React from "react";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { Block, Button } from "../../../shared";
import { Order, OrderType } from "../../../../services/orders/interface";
import { useNavigate } from "react-router-dom";

export const TransactionCard: React.FC<Order> = ({
  id,
  status,
  sell_amount,
  sell_currency,
  buy_amount,
  buy_currency,
  exchange_rate,
  created_at,
  payment_method,
  buy_amount_without_discount,
  discount_percentage,
  order_type,
  service_name,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const getStatusDisplay = () => {
    if (order_type === "EXCHANGE") {
      switch (status) {
        case "IN_PROGRESS":
        case "NEW":
          return { text: "В работе", color: "rgba(234, 194, 0, 1)", bgColor: "rgba(234, 194, 0, 0.1)" };
        case "SUCCEEDED":
          return { text: "Завершено", color: "rgba(0, 234, 0, 1)", bgColor: "rgba(0, 234, 0, 0.1)" };
        case "CANCELLED":
          return { text: "Отменено", color: "rgba(234, 0, 0, 1)", bgColor: "rgba(234, 0, 0, 0.1)" };
        default:
          return { text: "Неизвестно", color: "rgba(128, 128, 128, 1)", bgColor: "rgba(128, 128, 128, 0.1)" };
      }
    } else {
      switch (status) {
        case "PENDING":
          return { text: "В работе", color: "rgba(234, 194, 0, 1)", bgColor: "rgba(234, 194, 0, 0.1)" };
        case "PAID":
        case "COMPLETED":
          return { text: "Завершено", color: "rgba(0, 234, 0, 1)", bgColor: "rgba(0, 234, 0, 0.1)" };
        case "CANCELLED":
          return { text: "Отменено", color: "rgba(234, 0, 0, 1)", bgColor: "rgba(234, 0, 0, 0.1)" };
        default:
          return { text: "Неизвестно", color: "rgba(128, 128, 128, 1)", bgColor: "rgba(128, 128, 128, 0.1)" };
      }
    }
  };

  const handleRepeatTransaction = () => {
    if (order_type === "EXCHANGE") {
      navigate("/payment", {
        state: {
          selectedMainCurrency: buy_currency,
          selectedExchangeCurrency: sell_currency,
          inputAmount1: sell_amount,
          inputAmount2: buy_amount,
          exchangeRate: exchange_rate,
          paymentType: payment_method,
          buyAmountWithoutPercentage: buy_amount_without_discount,
          discountPercentage: discount_percentage,
        },
      });
    } else {
      navigate("/service-payment", {
        state: {
          selectedService: service_name,
          amount: buy_amount,
          currency: buy_currency,
        },
      });
    }
  };

  const statusInfo = getStatusDisplay();

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
            <Typography>{order_type === "EXCHANGE" ? "Покупка" : "Оплата сервиса"}</Typography>
            <Typography sx={{ color: "primary.main" }} component="span">
              #{id}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: "10px", opacity: ".5" }}>
            {created_at}
          </Typography>
          {order_type === "SERVICE" && (
            <Typography sx={{ fontSize: "12px", color: "primary.main" }}>
              {service_name}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            background: statusInfo.bgColor,
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
              color: statusInfo.color,
            }}
          >
            {statusInfo.text}
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
          <Typography sx={{ opacity: ".5" }}>
            {order_type === "EXCHANGE" ? "Получили" : "Стоимость подписки"}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Typography sx={{ fontSize: "18px" }}>
              {buy_amount}
            </Typography>
            {order_type === "SERVICE" ? (
              <Typography sx={{ fontSize: "18px" }}>$</Typography>
            ) : (
              <Typography sx={{ fontSize: "18px" }}>{buy_currency}</Typography>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ opacity: ".5" }}>Курс</Typography>
          <Typography>{exchange_rate.toFixed(2)}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ opacity: ".5" }}>
            {order_type === "EXCHANGE" ? "Отдали" : "Оплатили"}
          </Typography>
          <Typography>{sell_amount.toFixed(2) + " " + sell_currency}</Typography>
        </Box>
      </Box>

      {((order_type === "EXCHANGE" && status === "SUCCEEDED") ||
        (order_type === "SERVICE" && (status === "PAID" || status === "COMPLETED"))) && (
        <Button
          onClick={handleRepeatTransaction}
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
