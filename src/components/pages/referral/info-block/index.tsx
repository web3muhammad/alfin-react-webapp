import { Box, Collapse, IconButton,  Typography, useTheme } from "@mui/material";
import { Block } from "../../../shared";
import { ReferralInfoBlockIcon } from "../../../../icons";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useEffect, useState } from "react";

export function ReferralInfoBlock() {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(() => {
    const wasShown = localStorage.getItem("referralInfoShown");
    return !wasShown;
  });

  const handleClose = () => {
    localStorage.setItem("referralInfoShown", "true");
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
          <ReferralInfoBlockIcon />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <Typography
            sx={{ fontSize: "14px", fontWeight: 500, lineHeight: "1.25" }}
          >
            Зарабатывайте, приглашая друзей пользоваться Alfin!
          </Typography>
          <Typography
            sx={{
              fontSize: "12.5px",
              fontWeight: 400,
              opacity: 0.5,
              lineHeight: "1.25",
            }}
          >
            Новые пользователи, зарегистрированные по ссылке, приносят 20% от
            комиссии за выполненные сделки
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