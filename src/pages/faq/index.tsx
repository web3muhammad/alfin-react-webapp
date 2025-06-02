import { Box, Fade, Typography } from "@mui/material";
import { Block, Title } from "../../components/shared";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../../hooks";
import { useEffect } from "react";

export function FAQPage() {
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
      <Box sx={{ marginBottom: "100px" }}>
        <Title>Частые вопросы</Title>
        <Box sx={{ display: "grid", gap: ".75rem" }}>
          <Block>
            <Typography>В каких странах работает ваш сервис?</Typography>
            <Typography sx={{ opacity: ".5" }}>
              Мы работаем в Турции, ОАЭ, Тайланде, Италии, Франции (и других
              страны Европы), в странах СНГ, Америке, Индии и во многих других
              странах. Список стран регулярно обновляется.
            </Typography>
          </Block>
          <Block>
            <Typography>Какие комиссии вы взимаете за переводы?</Typography>
            <Typography sx={{ opacity: ".5" }}>
              Комиссия зависит от суммы перевода и страны получателя.
              Ознакомиться с актуальными курсами можно на нашем сайте или через
              бота.
            </Typography>
          </Block>
          <Block>
            <Typography>Есть ли дополнительные скрытые сборы?</Typography>
            <Typography sx={{ opacity: ".5" }}>
              Нет, все комиссии прозрачны и указываются заранее. Комиссия уже
              заложена в курсе обмена
            </Typography>
          </Block>
          <Block>
            <Typography>Какая минимальная сумма перевода?</Typography>
            <Typography sx={{ opacity: ".5" }}>
              Минимальная сумма зависит от способа перевода и страны получателя.
              Обычно это 200 USD или эквивалент.
            </Typography>
          </Block>
          <Block>
            <Typography>Сколько времени занимает перевод?</Typography>
            <Typography sx={{ opacity: ".5" }}>
              • На карту: от 5 минут до 1 часа.
            </Typography>
          </Block>
          <Block>
            <Typography>Могу ли я отменить перевод?</Typography>
            <Typography sx={{ opacity: ".5" }}>
              Если перевод еще не отправлен, его можно всегда отменить через
              менеджера.
            </Typography>
          </Block>

          <Block>
            <Typography>Как узнать, что перевод выполнен?</Typography>
            <Typography sx={{ opacity: ".5" }}>
              Вы получите уведомление в мессенджер от менеджера и чек об успешно
              проведенной заявке.
            </Typography>
          </Block>

          <Block>
            <Typography>Что делать, если перевод не прошел?</Typography>
            <Typography sx={{ opacity: ".5" }}>
              Обратитесь в нашу поддержку. Мы поможем выяснить причину и вернуть
              средства.
            </Typography>
          </Block>
          <Block>
            <Typography>Насколько безопасен ваш сервис?</Typography>
            <Typography sx={{ opacity: ".5" }}>
              Мы работаем более 3 – х лет на рынке, сотрудничаем с большим
              количеством блогеров, руководители медийные лица и всегда работают
              на большую аудиторию
            </Typography>
          </Block>
          <Block>
            <Typography>
              Какие меры принимаются для защиты от мошенников?
            </Typography>
            <Typography sx={{ opacity: ".5" }}>
              Все операции проходят проверку, а подозрительные транзакции
              блокируются. Мы проводим процедуру идентификации клиента и
              защищаем от мошеннических схем.
            </Typography>
          </Block>
          <Block>
            <Typography>Могу ли я оплатить перевод криптовалютой?</Typography>
            <Typography sx={{ opacity: ".5" }}>
              На данный момент вы можете оплатить в USDT
            </Typography>
          </Block>
          <Block>
            <Typography>Как связаться с вашей поддержкой?</Typography>
            <Typography sx={{ opacity: ".5" }}>
              Вы можете написать в чат-бот или позвонить по телефону горячей
              линии.
            </Typography>
          </Block>
          <Block>
            <Typography>Работает ли поддержка круглосуточно?</Typography>
            <Typography sx={{ opacity: ".5" }}>
              Да, наша поддержка доступна 7 дней в неделю с 9:30 до 22:00
            </Typography>
          </Block>
          <Block>
            <Typography>Где я могу оставить отзыв о вашем сервисе?</Typography>
            <Typography sx={{ opacity: ".5" }}>
              Вы можете оставить отзыв через бота или на нашем сайте.
            </Typography>
          </Block>
        </Box>
      </Box>
    </Fade>
  );
}
