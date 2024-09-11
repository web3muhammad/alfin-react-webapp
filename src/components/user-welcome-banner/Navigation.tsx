import { Box, Icon, SvgIcon, Typography } from "@mui/material";

import { CustomIconButton } from "../buttons/CustomIconButton";
import {
  FormatListBulletedRounded,
  Person,
  SmsRounded,
} from "@mui/icons-material";
export function Navigation() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "2.5rem",
      }}
    >
      <Box sx={{ width: "33.333%", display: "grid", placeItems: "center" }}>
        <CustomIconButton>
          <FormatListBulletedRounded sx={{ width: "20px" }} />
        </CustomIconButton>
        <Typography sx={{ paddingTop: ".25rem" }}>История</Typography>
      </Box>

      <Box
        sx={{
          width: "33.333%",
          display: "grid",
          placeItems: "center",
        }}
      >
        <CustomIconButton>
          <Person sx={{ width: "20px" }} />
        </CustomIconButton>
        <Typography sx={{ paddingTop: ".25rem" }}>Профиль</Typography>
      </Box>

      <Box sx={{ width: "33.333%", display: "grid", placeItems: "center" }}>
        <CustomIconButton>
          <SmsRounded sx={{ width: "18px", paddingTop: ".1rem" }} />
        </CustomIconButton>
        <Typography sx={{ paddingTop: ".25rem" }}>Поддержка</Typography>
      </Box>
    </Box>
  );
}
