import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { Block, Button } from "../../../shared";

type TransactionProps = {
  id: string;
  date: string;
  status: string;
  amount: string;
  price: string;
  paid: string;
  manager: string;
};

export const TransactionCard: React.FC<TransactionProps> = ({
  id,
  date,
  status,
  amount,
  price,
  paid,
  manager,
}) => {
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
            {date}
          </Typography>
        </Box>

        <Box
          sx={{
            background:
              status === "in-progress"
                ? "rgba(234, 194, 0, 0.1)"
                : status === "done"
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
                status === "in-progress"
                  ? "rgba(234, 194, 0, 1)"
                  : status === "done"
                  ? "rgba(0, 234, 0, 1)"
                  : "rgba(234, 0, 0, 1)",
            }}
          >
            {status === "in-progress"
              ? "В работе"
              : status === "done"
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
          <Typography sx={{ opacity: ".5" }}>Сумма</Typography>
          <Typography sx={{ fontSize: "18px" }}>{amount}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ opacity: ".5" }}>Цена</Typography>
          <Typography>{price}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ opacity: ".5" }}>Заплатили</Typography>
          <Typography>{paid}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ opacity: ".5" }}>Менеджер</Typography>
          <Typography>{manager}</Typography>
        </Box>
      </Box>

      {status === "done" && (
        <Button
          sx={{
            // backgroundColor: "primary.main",
            backgroundColor: "secondary.light",
            color: Telegram.WebApp.colorScheme === "dark" ? "#fff" : "unset",
            marginTop: "1rem",
          }}
        >
          Повторить транзакцию
        </Button>
      )}
    </Block>
  );
};
