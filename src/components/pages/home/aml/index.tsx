import { Box, Fade, Typography, useTheme } from "@mui/material";
import { Block, Button } from "../../../shared";
import { useNavigate } from "react-router-dom";

export function Aml() {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Block sx={{ position: "relative", overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          position: "relative",
          maxWidth: "73%",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
            AML-проверка
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
            Проверьте свой кошелек на AML-статус, чтобы обеспечить законность и
            безопасность операций
          </Typography>
          <Box>
            <Button
              onClick={() => navigate("/aml")}
              sx={{
                bgcolor: theme.palette.mode === "dark" ? "#3C3C3F" : "#e0e0e0",
                color: theme.palette.mode === "dark" ? "#fff" : "#000",
                borderRadius: "40px",
                padding: "0px 16px",
                fontSize: "12px",
                fontWeight: "500",
                width: "auto",
                minHeight: "35px",
                "&:hover": {
                  bgcolor: theme.palette.mode === "dark" ? "#3C3C3F" : "#e0e0e0",
                },
              }}
            >
              Пройти проверку
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        component="img"
        src="/aml-icon.png"
        sx={{
          position: "absolute",
          right: 0,
          left: "44%",
          top: "50%",
          transform: "translateY(-50%)",
          maxWidth: "300px",
          height: "auto",
          objectFit: "cover",
        }}
      />
    </Block>
  );
}
