import { Box, Fade, Typography } from "@mui/material";
import { Block, Title } from "../../components/shared";

export function AboutPage() {
  return (
    <Fade in>
      <Box>
        <Title>О нас</Title>
        <Block sx={{ display: "grid", rowGap: "10px" }}>
          <Typography>
            Добро пожаловать в Hayat Crypto – ваш надежный партнер в мире
            международных валютных обменов.
          </Typography>
          <Typography>
            Мы специализируемся на обмене рублей на турецкие лиры, дирхамы ОАЭ,
            саудовские риалы и криптовалюту Tether.
          </Typography>
          <Typography>
            Наша миссия — обеспечить безопасные, быстрые и выгодные финансовые
            операции для людей, которые живут или путешествуют за границей.
          </Typography>
          <Typography>
            В Hayat Crypto мы понимаем, насколько важен для вас комфорт при
            обмене валюты. Именно поэтому мы предлагаем удобные решения, которые
            отвечают вашим потребностям. Независимо от того, где вы находитесь,
            с нами вы всегда можете рассчитывать на прозрачные условия,
            конкурентные курсы и высококлассный сервис.
          </Typography>
          <Typography>
            Доверяйте свои финансы профессионалам — выбирайте Hayat Crypto!
          </Typography>
        </Block>
      </Box>
    </Fade>
  );
}
