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
import { useEffect } from "react";
import { useTelegram } from "../../hooks";

export function TransactionHistoryPage() {
  const navigate = useNavigate();
  const { tg } = useTelegram();
  useEffect(() => {
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", () => navigate(`/`));

    return () => {
      tg.BackButton.hide();
      tg.offEvent("backButtonClicked", () => navigate(`/`));
    };
  }, [navigate, tg]);
  const { data: orderHistoryData, isLoading } = useQuery({
    queryFn: getOrderHistory,
    queryKey: ["order-history"],
  });

  return (
    <Fade in>
      <Box sx={{ width: "100%", marginBlock: "100px" }}>
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
              Здесь будет отображаться история ваших операций.Создайте первую
              заявку, чтобы увидеть, как это работает!
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
