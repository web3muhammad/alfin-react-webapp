import { Box } from "@mui/material";
import {
  GeneralNavigationBlock,
  PersonalDataBlock,
  ReferralProgramBlock,
  SocialMediaBlock,
} from "../../components/pages/profile";
import { UserWelcomeBanner } from "../../components/user-welcome-banner";

export function ProfilePage() {
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
