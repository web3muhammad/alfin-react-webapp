import {
  ChevronRight,
  GradeRounded,
  HelpRounded,
  Info,
  SupportRounded,
} from "@mui/icons-material";
import { Block } from "../../../../shared";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export function GeneralNavigationBlock() {
  const navigate = useNavigate();

  return (
    <Block sx={{ paddingTop: "8px", paddingBottom: "8px" }}>
      <List sx={{ padding: "0" }}>
        <ListItem
          onClick={() => navigate("/about")}
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
              <Info sx={{ width: "20px", color: "#fff" }} />
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
                  О нас
                </Typography>
              }
            />
            <ChevronRight sx={{ color: "#b0b0b0", marginLeft: "auto" }} />
          </Box>
        </ListItem>

        <ListItem
          onClick={() => navigate("/faq")}
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
              <HelpRounded sx={{ width: "20px", color: "#fff" }} />
            </ListItemIcon>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexGrow: 1,
              paddingBottom: "8px",

              borderBottom: `1px solid ${
                Telegram.WebApp.colorScheme === "dark"
                  ? "rgba(56, 76, 96, 1)"
                  : "rgba(239, 239, 243, 1)"
              }`,
            }}
          >
            <ListItemText
              sx={{ margin: 0 }}
              primary={
                <Typography sx={{ marginTop: "16px", paddingBottom: "8px" }}>
                  Частые вопросы
                </Typography>
              }
            />
            <ChevronRight sx={{ color: "#b0b0b0", marginLeft: "auto" }} />
          </Box>
        </ListItem>

        <ListItem
          onClick={() =>
            Telegram.WebApp.openLink(
              "https://widget.senja.io/widget/9ddf2097-0044-4319-bfb5-6a553c879dac"
            )
          }
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
              <GradeRounded sx={{ width: "20px", color: "#fff" }} />
            </ListItemIcon>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexGrow: 1,
              paddingBottom: "8px",

              borderBottom: `1px solid ${
                Telegram.WebApp.colorScheme === "dark"
                  ? "rgba(56, 76, 96, 1)"
                  : "rgba(239, 239, 243, 1)"
              }`,
            }}
          >
            <ListItemText
              sx={{ margin: 0 }}
              primary={
                <Typography sx={{ marginTop: "16px", paddingBottom: "8px" }}>
                  Отзывы
                </Typography>
              }
            />
            <ChevronRight sx={{ color: "#b0b0b0", marginLeft: "auto" }} />
          </Box>
        </ListItem>

        <ListItem
          onClick={() =>
            Telegram.WebApp.openTelegramLink("https://t.me/alfin_support")
          }
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
              <SupportRounded sx={{ width: "20px", color: "#fff" }} />
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
                  Техническая поддержка
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
