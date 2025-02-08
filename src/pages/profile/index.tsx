import { Box } from "@mui/material";
import {
  GeneralNavigationBlock,
  PersonalDataBlock,
  ReferralProgramBlock,
  SocialMediaBlock,
} from "../../components/pages/profile";
import { UserWelcomeBanner } from "../../components/shared";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../../hooks";
import { useEffect } from "react";

export function ProfilePage() {
  const navigate = useNavigate();

  const { tg } = useTelegram();
  useEffect(() => {
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", () => navigate(`/`));

    return () => {
      tg.BackButton.hide();
      tg.offEvent("backButtonClicked", () => navigate(`/`));
    };
  }, [navigate, tg]);

  return (
    <Box>
      <UserWelcomeBanner />
      <Box sx={{ display: "grid", gap: "15px", marginTop: "30px" }}>
        {/* <ReferralProgramBlock /> */}
        <PersonalDataBlock />
        <GeneralNavigationBlock />
        <SocialMediaBlock />
      </Box>
    </Box>
  );
}
