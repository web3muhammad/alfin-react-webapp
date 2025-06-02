import { Box, Fade, Typography } from "@mui/material";
import { Title } from "../../components/shared";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../../hooks";
import { useEffect } from "react";
import { ReferralStats } from "../../components/pages/referral/stats";
import {
  ReferralTransactions,
  Transaction,
} from "../../components/pages/referral/transactions";
import { ReferralInfoBlock } from "../../components/pages/referral/info-block";
import { getReferralStats } from "../../services/referrals/stats";
import { getReferralTransactions } from "../../services/referrals/transactions";
import { useQuery } from "react-query";

export function ReferralPage() {
  const navigate = useNavigate();
  const { tg } = useTelegram();

  const { data: referralStats } = useQuery("referralStats", getReferralStats, {
    retry: false,
  });
  const { data: referralTransactions } = useQuery(
    "referralTransactions",
    getReferralTransactions,
    { retry: false }
  );

  useEffect(() => {
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", () => navigate(`/profile`));

    return () => {
      tg.BackButton.hide();
      tg.offEvent("backButtonClicked", () => navigate(`/profile`));
    };
  }, [navigate, tg]);

  const handleInviteFriend = () => {
    const referralLink = referralStats?.referral_link ?? "";
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=Присоединяйся к Alfin!`;
    tg.openTelegramLink(shareUrl);
  };

  const handleWithdrawFunds = () => {
    navigate("/withdrawl", { state: { balance: referralStats?.referral_balance ?? 0 } });
  };

  return (
    <Fade in>
      <Box sx={{ marginBlock: "100px" }}>
        <Title>Реферальная программа</Title>
        <ReferralStats
          invitedFriends={referralStats?.referrals_count ?? 0}
          balance={referralStats?.referral_balance ?? 0}
          onInviteFriend={handleInviteFriend}
          onWithdrawFunds={handleWithdrawFunds}
        />
        <ReferralInfoBlock />
        <Box sx={{ marginTop: "32px" }}>
          <Typography sx={{ fontSize: "20px", fontWeight: 500 }}>
            Транзакции
          </Typography>
          <ReferralTransactions
            transactions={
              referralTransactions?.map((transaction) => ({
                type:
                  transaction.status === 'COMMISSION'
                    ? "reward"
                    : "withdraw",
                title: transaction.status,
                date: transaction.created_at,
                amount: transaction.amount,
              })) ?? []
            }
          />
        </Box>
      </Box>
    </Fade>
  );
}
