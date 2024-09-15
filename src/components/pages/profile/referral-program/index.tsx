import { Box, Divider, Typography } from "@mui/material";
import { Block, Button } from "../../../shared";
import { useTelegram } from "../../../../hooks";
import { useNavigate } from "react-router-dom";

const testData = { friends: 0, constantDiscount: 0, oneTimeDiscount: 0 };

export function ReferralProgramBlock() {
  const navigate = useNavigate()
  const { tg } = useTelegram();

  return (
    <>
      <Block sx={{ display: "grid", gap: ".5rem" }}>
        <Box>
          <Typography>
            Получайте дополнительные скидки за приглашенных друзей!
          </Typography>
          <Typography
            onClick={() => navigate('/referral-info')}
            sx={{
              color: "primary.main",
              fontSize: "12px",
              fontWeight: "500",
              paddingTop: ".25rem",
              cursor: "pointer",
            }}
          >
            Подробнее об условиях
          </Typography>
        </Box>
        <Divider sx={{ margin: "8px -16px" }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ opacity: ".5" }}>Друзья</Typography>
          <Typography>{testData.friends}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ opacity: ".5" }}>Постоянная скидка</Typography>
          <Typography>{testData.constantDiscount}%</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ opacity: ".5" }}>Разовая скидка</Typography>
          <Typography>{testData.oneTimeDiscount}%</Typography>
        </Box>
        <Button
          sx={{ marginTop: "1rem" }}
          onClick={() => {
            tg.openTelegramLink(
              "https://t.me/share/url?url=https://t.me/ramazanov_rv&start=&text=Let's exchange together"
            );
          }}
        >
          Пригласить друга
        </Button>
      </Block>
    </>
  );
}
