import { Box, Typography } from "@mui/material";
import { Block, Title } from "../../components/shared";

export function FAQPage() {
  return (
    <>
      <Title>Частые вопросы</Title>
      <Box sx={{ display: "grid", gap: ".75rem" }}>
        <Block>
          <Typography>Как быстро происходит обмен валюты?</Typography>
          <Typography sx={{ opacity: ".5" }}>
            Операция обмена занимает от нескольких минут до часа, в зависимости
            от выбранного вами метода перевода и валюты.
          </Typography>
        </Block>
        <Block>
          <Typography>Безопасны ли ваши операции?</Typography>
          <Typography sx={{ opacity: ".5" }}>
            Да, мы используем передовые технологии шифрования и соблюдаем
            строгие стандарты безопасности, чтобы защитить ваши данные и
            средства.
          </Typography>
        </Block>
        <Block>
          <Typography>Какие комиссии взимаются при обмене?</Typography>
          <Typography sx={{ opacity: ".5" }}>
            Мы предлагаем прозрачные условия: комиссия зависит от суммы и типа
            валюты, и всегда отображается до подтверждения сделки.
          </Typography>
        </Block>
      </Box>
    </>
  );
}
