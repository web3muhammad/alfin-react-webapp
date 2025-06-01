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
import { ChevronRight, CreditCardRounded, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export function PersonalDataBlock() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Block sx={{ paddingTop: "8px", paddingBottom: "8px" }}>
      <List sx={{ padding: "0" }}>
        <ListItem
          onClick={() => navigate("/personal-data")}
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
              <Person sx={{ width: "20px", color: "#fff" }} />
            </ListItemIcon>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexGrow: 1,
              borderBottom: `1px solid ${
                theme.palette.mode === "dark"
                  ? "#3C3C3F"
                  : "rgba(239, 239, 243, 1)"
              }`,
              paddingBottom: "8px",
            }}
          >
            <ListItemText
              sx={{ margin: 0 }}
              primary={
                <Typography sx={{ marginTop: "16px", paddingBottom: "8px" }}>
                  Личные данные
                </Typography>
              }
            />
            <ChevronRight sx={{ color: "#b0b0b0", marginLeft: "auto" }} />
          </Box>
        </ListItem>

        <ListItem
          onClick={() => navigate("/bank-cards")}
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
              <CreditCardRounded sx={{ width: "20px", color: "#fff" }} />
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
                  Ваши реквизиты
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
