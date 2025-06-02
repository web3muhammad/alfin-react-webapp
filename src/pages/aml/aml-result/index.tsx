import { Box, Typography, Divider, useTheme, Fade } from "@mui/material";
import { Title } from "../../../components/shared";
import { AmlProgessBar } from "../../../components/shared/ProgressBar/AmlProgessBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTelegram } from "../../../hooks";

export function AmlResultPage() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { tg } = useTelegram();
  const amlResult = location.state?.amlResult;

  useEffect(() => {
    // Показываем кнопку "назад"
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", () => navigate("/aml"));

    if (!amlResult) {
      navigate("/aml");
    }

    return () => {
      tg.BackButton.hide();
      tg.offEvent("backButtonClicked", () => navigate("/aml"));
    };
  }, [amlResult, navigate, tg]);

  if (!amlResult) return null;

  // Маппинг уровня риска
  let riskLabel = "Низкий риск";
  if (amlResult.risk_level === "high") riskLabel = "Высокий риск";
  else if (amlResult.risk_level === "medium") riskLabel = "Средний риск";

  // Данные для блока
  const address = amlResult.address?.address || "-";
  const firstTx = amlResult.address?.first_tx_date || "Нет";
  const lastTx = amlResult.address?.last_tx_date || "Нет";
  const txCount = amlResult.address?.tx_count ?? "Нет";

  return (
    <Fade in timeout={800}>
      <Box sx={{ width: "100%" }}>
        <Title>Результат AML-проверки</Title>

        {/* Прогресс бар */}
        <Box
          sx={{
            mt: 4,
            mb: 6,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <AmlProgessBar
            riskPercent={amlResult.risk_score}
            riskLabel={riskLabel}
          />
        </Box>

        {/* Информационный блок */}
        <Box
          sx={{
            maxWidth: 400,
            mx: "auto",
            background: theme.palette.mode === "dark" ? "#232323" : "#fff",
            borderRadius: "16px",
            p: 2,
          }}
        >
          {/* Блокчейн */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 400,
              }}
            >
              Блокчейн
            </Typography>
            <Typography fontWeight={400} sx={{ fontSize: "13px" }}>
              {amlResult.address?.network}
            </Typography>
          </Box>
          <Divider
            sx={{
              my: 1.5,
              borderColor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.1)",
            }}
          />

          {/* Адрес кошелька */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 400,
              }}
            >
              Адрес кошелька
            </Typography>
            <Typography
              fontWeight={400}
              sx={{
                wordBreak: "break-all",
                maxWidth: "60%",
                textAlign: "right",
                fontSize: "13px",
              }}
            >
              {address}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
}
