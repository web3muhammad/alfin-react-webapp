import { Box, Collapse, IconButton, Typography, useTheme } from "@mui/material";
import { Block } from "../../../../shared";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState } from "react";

export function ServicePaymentInfoBlock() {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(() => {
    const wasShown = localStorage.getItem("servicePaymentInfoShown");
    return !wasShown;
  });

  const handleClose = () => {
    localStorage.setItem("servicePaymentInfoShown", "true");
    setIsVisible(false);
  };

  return (
    <Collapse in={isVisible} timeout={300}>
      <Block
        sx={{
          mt: "16px",
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <Box
          sx={{
            minWidth: "32px",
            width: "32px",
            height: "32px",
            bgcolor: theme.palette.mode === "dark" ? "#3C3C3F" : "#e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
          }}
        >
          <CreditCardIcon sx={{ fontSize: "20px", color: "primary.main" }} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <Typography
            sx={{ fontSize: "14px", fontWeight: 400, lineHeight: "1.25" }}
          >
            Вы получите виртуальную карту и сможете оплатить нужный сервис
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          sx={{
            minWidth: "24px",
            width: "24px",
            height: "24px",
            bgcolor: theme.palette.mode === "dark" ? "#3C3C3F" : "#e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            "&:hover": {
              bgcolor: theme.palette.mode === "dark" ? "#3C3C3F" : "#e0e0e0",
            },
          }}
        >
          <CloseRoundedIcon sx={{ color: "#8C8C8D", fontSize: "14px" }} />
        </IconButton>
      </Block>
    </Collapse>
  );
} 