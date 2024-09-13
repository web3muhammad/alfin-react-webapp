import { ChevronRight } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Block } from "../../../../shared";
import { useNavigate } from "react-router-dom";

export function SocialMediaBlock() {
  const navigate = useNavigate();

  return (
    <Block sx={{ paddingTop: "8px", paddingBottom: "8px" }}>
      <List sx={{ padding: "0" }}>
        <ListItem
          onClick={() => navigate("")}
          sx={{
            paddingTop: "0",
            paddingInline: 0,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer",
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
              <TelegramIcon
                sx={{ width: "20px", color: "#fff", marginRight: "2px" }}
              />
            </ListItemIcon>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexGrow: 1,
              borderBottom: `1px solid ${
                Telegram.WebApp.colorScheme === "dark"
                  ? "rgba(56, 76, 96, 1)"
                  : "rgba(239, 239, 243, 1)"
              }`,
              paddingBottom: "8px",
            }}
          >
            <ListItemText
              sx={{ margin: 0 }}
              primary={
                <Typography sx={{ marginTop: "16px", paddingBottom: "8px" }}>
                  Telegram
                </Typography>
              }
            />
            <ChevronRight sx={{ color: "#b0b0b0", marginLeft: "auto" }} />
          </Box>
        </ListItem>

        <ListItem
          onClick={() => navigate("")}
          sx={{
            paddingTop: "0",
            paddingInline: 0,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer",
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
              <InstagramIcon sx={{ width: "20px", color: "#fff" }} />
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
                <Typography sx={{ paddingTop: "10px" }}>Instagram</Typography>
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
