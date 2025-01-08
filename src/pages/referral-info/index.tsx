import { Box, Fade, Typography } from "@mui/material";
import { Block, Title } from "../../components/shared";
import { useNavigate } from "react-router-dom";
import { useTelegramBackButton } from "../../hooks/useTelegramBackButton";

export function ReferralInfoPage() {
  const navigate = useNavigate();
  useTelegramBackButton(() => navigate("/profile"));
  return (
    <Fade in>
      <Box>
        <Title>Реферальная программа</Title>
        <Block>
          <Box sx={{ display: "grid", gap: "8px" }}>
            <Typography>
              Если по вашей рекомендации клиент обменял у нас, либо узнал о
              наших услугах написав нам, вы получаете скидку 0.5% к следующему
              обмену и помимо этого 0.05% к постоянной скидке.
            </Typography>
            <Typography>
              Посредством этого вы сможете получить постоянную скидку до 1%.
            </Typography>
          </Box>
        </Block>
      </Box>
    </Fade>
  );
}
