import { Box, CircularProgress, Fade, Typography } from "@mui/material";
import { Button, Title } from "../../components/shared";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getAllBankCards } from "../../services/bank-cards";
import { BankCard } from "../../components/pages/bank-cards/components/BankCard";
import { useTelegramBackButton } from "../../hooks/useTelegramBackButton";

export function BankCardsPage() {
  const navigate = useNavigate();
  useTelegramBackButton(() => navigate("/profile"));
  const { data: allBankCards, isLoading } = useQuery({
    queryFn: getAllBankCards,
    queryKey: ["all-cards"],
  });

  return (
    <Fade in>
      <Box sx={{ width: "100%" }}>
        <Title>Банковские карты</Title>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "70vh",
            }}
          >
            <CircularProgress size={35} />
          </Box>
        ) : allBankCards?.length === 0 ? (
          <Box
            sx={{
              height: "70vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{ textAlign: "center", opacity: ".5", margin: "0 auto" }}
            >
              Вы еще не добавили ни одной карты
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: "grid", gap: "12px" }}>
            {allBankCards?.map((card) => (
              <BankCard key={card.id} {...card} />
            ))}
          </Box>
        )}

        <Button
          onClick={() =>
            navigate("/add-card", {
              state: {
                formType: "create",
              },
            })
          }
          sx={{ marginTop: "1rem" }}
        >
          Добавить карту
        </Button>
      </Box>
    </Fade>
  );
}
