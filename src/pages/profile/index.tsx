import { Box } from "@mui/material";
import {
  GeneralNavigationBlock,
  PersonalDataBlock,
  ReferralProgramBlock,
  SocialMediaBlock,
} from "../../components/pages/profile";
import { UserWelcomeBanner } from "../../components/user-welcome-banner";
import { useTelegram } from "../../hooks";

export function ProfilePage() {
  const { tg } = useTelegram();
  tg.BackButton.show();
  return (
    <>
      <UserWelcomeBanner />

      <Box sx={{ display: "grid", gap: "15px", marginTop: "30px" }}>
        <ReferralProgramBlock />
        <PersonalDataBlock />
        <GeneralNavigationBlock />
        <SocialMediaBlock />
      </Box>
    </>
  );
}
