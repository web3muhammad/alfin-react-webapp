import { Box, Fade, Typography } from "@mui/material";
import { Block, Title } from "../../components/shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTelegram } from "../../hooks";

export function AboutPage() {
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

  return (
    <Fade in>
      <Box sx={{ marginBottom: "100px", width: "100%" }}>
        <Title>О нас</Title>
        <Block sx={{ display: "grid", rowGap: "10px" }}>
          <Typography>
            Alfin – Ваш надежный партнер в мире международных переводов!
          </Typography>
          <Typography>
            Наша миссия — это безопасные, быстрые и выгодные финансовые операции
            для людей, которые проживают, ведут бизнес и перемещаются за
            границей.
          </Typography>
          <Typography>
            Мы сосредоточены на помощи в переводе рублей на турецкие лиры,
            дирхамы ОАЭ, саудовские риалы и криптовалюту USDT.
          </Typography>
          <Typography>
            В Alfin мы понимаем, что безопасность, удобство и комфорт - это
            основа при обмене валюты. Именно поэтому Мы предлагаем проверенные и
            удобные решения, которые удовлетворяют Ваши потребности. Независимо
            от того, где Вы находитесь, Мы гарантируем прозрачные условия,
            конкурентные курсы и высококлассный сервис.
          </Typography>
          <Typography>
            Доверяйте своим финансовым профессионалам — выбирайте Alfin!{" "}
          </Typography>
        </Block>
      </Box>
    </Fade>
  );
}
