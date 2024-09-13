import { Box, Typography } from "@mui/material";
import { Block } from "../../../shared";
import { Button } from "../../../shared/Button";
import { useTelegram } from "../../../../hooks";

const testData = { friends: 5, constantDiscount: 0.25, oneTimeDiscount: 0.5 };

export function ReferralProgramBlock() {
  const { tg } = useTelegram();

  return (
    <Block sx={{ display: "grid", gap: ".5rem" }}>
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
  );
}
