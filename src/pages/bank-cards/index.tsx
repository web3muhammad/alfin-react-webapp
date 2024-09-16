import { Box, Fade, Typography } from "@mui/material";
import { Button, Title } from "../../components/shared";
import { useNavigate } from "react-router-dom";

export function BankCardsPage() {
  const navigate = useNavigate()

  return (
    <Fade in>
      <Box>
        <Title>Банковские карты</Title>
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
          <Button onClick={() => navigate('/add-card')} sx={{ marginTop: "1rem" }}>Добавить карту</Button>
        </Box>
      </Box>
    </Fade>
  );
}
