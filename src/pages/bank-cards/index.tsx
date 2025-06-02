import { Box, CircularProgress, Fade, Typography } from "@mui/material";
import { Button, Title } from "../../components/shared";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getAllBankCards } from "../../services/bank-cards";
import { BankCard } from "../../components/pages/bank-cards/components/BankCard";
import { useTelegram } from "../../hooks";
import { useEffect } from "react";

export function BankCardsPage() {
  const navigate = useNavigate();

  const { tg } = useTelegram();
  useEffect(() => {
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", () => navigate(`/profile`));

    return () => {
      tg.BackButton.hide();
      tg.offEvent("backButtonClicked", () => navigate(`/profile`));
    };
  }, [navigate, tg]);

  const { data: allBankCards, isLoading } = useQuery({
    queryFn: getAllBankCards,
    queryKey: ["all-cards"],
  });

  return (
    <Fade in>
      <Box sx={{ width: "100%", marginBottom: "100px" }}>
        <Title>Ваши реквизиты</Title>
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
              height: "55vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{ textAlign: "center", opacity: ".5", margin: "0 auto" }}
            >
              В этом разделе вы можете добавить данные ваших банковских карт или
              адреса для получения криптовалюты. Это удобно и экономит ваше
              время. Как это работает:
            </Typography>
            <br />
            <Typography
              sx={{ textAlign: "center", opacity: ".5", margin: "0 auto" }}
            >
              • Один раз добавьте вашу карту или криптовалютный адрес.
            </Typography>

            <Typography
              sx={{ textAlign: "center", opacity: ".5", margin: "0 auto" }}
            >
              • При создании заявки вы сможете быстро выбрать нужную карту или
              адрес из выпадающего списка, не вводя их каждый раз заново.
            </Typography>
            <br />
            <Typography
              sx={{ textAlign: "center", opacity: ".5", margin: "0 auto" }}
            >
              Если вы пока не добавили данные, страница может казаться пустой.
              Чтобы начать, нажмите на кнопку «Добавить реквизиты» и заполните
              необходимые поля. Ваши данные сохранятся, и все будущие операции
              станут еще проще и быстрее!
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
          Добавить реквизиты
        </Button>
      </Box>
    </Fade>
  );
}
