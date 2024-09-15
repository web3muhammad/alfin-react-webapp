import { Box, Divider, Fade, Typography } from "@mui/material";
import { Block, Title } from "../../components/shared";
import { TransactionCard } from "../../components/pages/history";
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
  return (
    <Fade in>
      <Box>
        <Title>История</Title>
        {transactions.length === 0 && (
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
        )}

        <Box sx={{ display: "grid", gap: "12px" }}>
          {transactions.map((transaction, index) => (
            <TransactionCard
              key={index}
              id={transaction.id}
              date={transaction.date}
              status={transaction.status}
              amount={transaction.amount}
              price={transaction.price}
              paid={transaction.paid}
              manager={transaction.manager}
            />
          ))}
        </Box>
      </Box>
    </Fade>
  );
}
