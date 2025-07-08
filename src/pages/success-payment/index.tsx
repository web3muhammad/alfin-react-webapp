import { Box, Typography, useTheme } from "@mui/material";
import { Button } from "../../components/shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTelegram } from "../../hooks";

export function SuccessPaymentPage() {
  const theme = useTheme();
  const navigate = useNavigate(); 
  const { tg } = useTelegram();
  const handleBackToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", handleBackToHome);

    return () => {
      tg.offEvent("backButtonClicked", handleBackToHome);
      tg.BackButton.hide();
    };
  }, [tg]);

  return (
    <Box
      sx={{
        width: "100%",
        height: '70vh',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.15)",
            filter: "blur(25px)",
            zIndex: 0,
          },
        }}
      >
        <Box
          component="img"
          src={"/success-letter.png"}
          alt="success-payment"
          sx={{
            width: "100%",
            maxWidth: "125px",
            position: "relative",
            zIndex: 1,
          }}
        />
      </Box>
      <Typography sx={{ fontSize: 24, fontWeight: 600, mt: 2 }}>
        Ожидаем подтверждение
      </Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 400, mt: 1 }}>
        Это займёт до 10 минут
      </Typography>
      <Button onClick={() => navigate("/history")} sx={{ mt: 2 }}>
        Перейти к истории транзакций
      </Button>
    </Box>
  );
}
