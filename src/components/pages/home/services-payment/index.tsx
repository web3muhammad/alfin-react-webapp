import { Box, Typography, useTheme } from "@mui/material";
import { Block, Button } from "../../../shared";
import { useNavigate } from "react-router-dom";

export function ServicesPayment() {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <>
      <Block sx={{ position: "relative", overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            position: "relative",
            maxWidth: "100%",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Box
              component="img"
              src={
                theme.palette.mode === "dark"
                  ? "/service-payment-dark.png"
                  : "/service-payment-light.png"
              }
              sx={{
                maxWidth: "115px",
                height: "auto",
              }}
            />
            <Typography
              sx={{ fontSize: 14, fontWeight: 500, width: "100%", pt: 0.5 }}
            >
              Оплата сервисов
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 400,
                opacity: 0.5,
                lineHeight: "1.2",
                pt: 0.5,
                pb: 1.2,
              }}
            >
              Легко оплачивайте все популярные сервисы
            </Typography>
            <Box>
              <Button
                disableGlassEffect
                onClick={() => navigate("/service-payment")}
                sx={{
                  bgcolor:
                    theme.palette.mode === "dark" ? "#3C3C3F" : "#e0e0e0",
                  color: theme.palette.mode === "dark" ? "#fff" : "#000",
                  borderRadius: "40px",
                  padding: "0px 10px",
                  fontSize: "11px",
                  fontWeight: "500",
                  width: "auto",
                  minHeight: "35px",
                  "&:hover": {
                    bgcolor:
                      theme.palette.mode === "dark" ? "#3C3C3F" : "#e0e0e0",
                  },
                }}
              >
                Оплатить сервис
              </Button>
            </Box>
          </Box>
        </Box>
      </Block>
    </>
  );
}
