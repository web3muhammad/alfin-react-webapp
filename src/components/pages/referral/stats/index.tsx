import { Box, Typography, useTheme } from "@mui/material";
import { Block, Button } from "../../../shared";

interface ReferralStatsProps {
  invitedFriends: number;
  balance: number;
  onInviteFriend?: () => void;
  onWithdrawFunds?: () => void;
}

export function ReferralStats({
  invitedFriends,
  balance,
  onInviteFriend,
  onWithdrawFunds,
}: ReferralStatsProps) {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", gap: "16px", justifyContent: "space-between" }}>
      {/* Invited friends */}
      <Block
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Typography sx={{ fontSize: "32px", fontWeight: 500, lineHeight: "1" }}>
          {invitedFriends}
        </Typography>
        <Typography sx={{ fontSize: "12px", fontWeight: 400, opacity: 0.5 }}>
          пригласили друзей
        </Typography>
        <Button
          onClick={onInviteFriend}
          sx={{
            fontSize: "12px",
            fontWeight: 500,
            minHeight: "31px !important",
            marginInline: "auto",
            marginTop: "8px",
            borderRadius: "40px",
            paddingInline: "8px !important",
            paddingBlock: "0px",
            bgcolor: theme.palette.mode === "dark" ? "#3C3C3F" : "#e0e0e0",
            color: theme.palette.mode === "dark" ? "#fff" : "#000",
            "&:hover": {
              bgcolor: theme.palette.mode === "dark" ? "#3C3C3F" : "#e0e0e0",
            },
          }}
        >
          Пригласить
        </Button>
      </Block>

      {/* User's balance */}
      <Block
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Typography sx={{ fontSize: "32px", fontWeight: 500, lineHeight: "1" }}>
          {balance} ₽
        </Typography>
        <Typography sx={{ fontSize: "12px", fontWeight: 400, opacity: 0.5 }}>
          ваш баланс
        </Typography>
        <Button
          onClick={onWithdrawFunds}
          sx={{
            fontSize: "12px",
            fontWeight: 500,
            minHeight: "31px !important",
            marginInline: "auto",
            marginTop: "8px",
            borderRadius: "40px",
            paddingInline: "8px",
            paddingBlock: "0px",
            bgcolor: theme.palette.mode === "dark" ? "#3C3C3F" : "#e0e0e0",
            color: theme.palette.mode === "dark" ? "#fff" : "#000",
            "&:hover": {
              bgcolor: theme.palette.mode === "dark" ? "#3C3C3F" : "#e0e0e0",
            },
          }}
        >
          Вывести
        </Button>
      </Block>
    </Box>
  );
}
