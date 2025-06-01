import { ChevronRight, CardGiftcard } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { Block } from "../../../../shared";
import { useNavigate } from "react-router-dom";
import { ReferralIcon } from "../../../../../icons";

export function ReferralBlock() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Block sx={{ paddingTop: "8px", paddingBottom: "8px" }}>
      <List sx={{ padding: "0" }}>
        <ListItem
          onClick={() => navigate("/referral")}
          sx={{
            paddingTop: "0",
            paddingInline: 0,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer",
            paddingBottom: "0px !important",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <ListItemIcon
              sx={{
                backgroundColor: "primary.main",
                minWidth: "32px",
                minHeight: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            >
              <ReferralIcon />
            </ListItemIcon>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexGrow: 1,
              borderBottom: "none",
              paddingBottom: "8px",
            }}
          >
            <ListItemText
              sx={{ margin: 0 }}
              primary={
                <Typography sx={{ paddingTop: "10px" }}>
                  Реферальная программа
                </Typography>
              }
            />
            <ChevronRight
              sx={{ color: "#b0b0b0", marginLeft: "auto", marginTop: "8px" }}
            />
          </Box>
        </ListItem>
      </List>
    </Block>
  );
}
