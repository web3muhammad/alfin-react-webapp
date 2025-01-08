import { Box } from "@mui/material";
import {
  GeneralNavigationBlock,
  PersonalDataBlock,
  ReferralProgramBlock,
  SocialMediaBlock,
} from "../../components/pages/profile";
import { UserWelcomeBanner } from "../../components/shared";
import { useTelegramBackButton } from "../../hooks/useTelegramBackButton";
import { useNavigate } from "react-router-dom";

export function ProfilePage() {
  const navigate = useNavigate();
  useTelegramBackButton(() => navigate("/"));

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
