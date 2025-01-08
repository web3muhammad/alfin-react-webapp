import {
  Box,
  CircularProgress,
  Divider,
  Fade,
  Typography,
} from "@mui/material";
import { Block, Title } from "../../components/shared";
import { TransactionCard } from "../../components/pages/history";
import { useQuery } from "react-query";
import { getOrderHistory } from "../../services/orders/history";
import { useNavigate } from "react-router-dom";
import { useTelegramBackButton } from "../../hooks/useTelegramBackButton";
const transactions = [
  {
    id: "210488",
    date: "26.08.2024 16:40:24",
    status: "in-progress",
    amount: "5190 TRY",
    price: "2.89 RUB",
    paid: "15 000 RUB",
    manager: "Ахмед",
  },
  {
    id: "210489",
    date: "27.08.2024 14:30:00",
    status: "done",
    amount: "4200 TRY",
    price: "2.70 RUB",
    paid: "11 340 RUB",
    manager: "Виктор",
  },
  {
    id: "210489",
    date: "27.08.2024 14:30:00",
    status: "done",
    amount: "4200 TRY",
    price: "2.70 RUB",
    paid: "11 340 RUB",
    manager: "Виктор",
  },
  {
    id: "210489",
    date: "27.08.2024 14:30:00",
    status: "done",
    amount: "4200 TRY",
    price: "2.70 RUB",
    paid: "11 340 RUB",
    manager: "Виктор",
  },
  {
    id: "210490",
    date: "28.08.2024 12:20:45",
    status: "canceled",
    amount: "3500 TRY",
    price: "2.60 RUB",
    paid: "9 100 RUB",
    manager: "Дмитрий",
  },
];

export function TransactionHistoryPage() {
  const navigate = useNavigate();
  useTelegramBackButton(() => navigate("/"));
  const { data: orderHistoryData, isLoading } = useQuery({
    queryFn: getOrderHistory,
    queryKey: ["order-history"],
  });

  return (
    <Fade in>
      <Box sx={{ width: "100%" }}>
        <Title>История</Title>
        {orderHistoryData?.length === 0 ? (
          <Box
            sx={{
              height: "70vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{ textAlign: "center", opacity: ".5", margin: "0 auto" }}
            >
              Вы еще не совершили ни одной транзакции
            </Typography>
          </Box>
        ) : isLoading ? (
          <Box
            sx={{
              width: "100%",
              height: "70vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress size={35} />
          </Box>
        ) : (
          <Box sx={{ display: "grid", gap: "12px" }}>
            {orderHistoryData?.map((transaction) => (
              <TransactionCard key={transaction.id} {...transaction} />
            ))}
          </Box>
        )}
      </Box>
    </Fade>
  );
}
