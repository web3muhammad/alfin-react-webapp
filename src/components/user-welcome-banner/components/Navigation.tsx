import { Box, Typography } from "@mui/material";

import {
  FormatListBulletedRounded,
  Person,
  SmsRounded,
} from "@mui/icons-material";
import { CustomIconButton } from "../../shared/";
export function Navigation() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "2rem",
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
