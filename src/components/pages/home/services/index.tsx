import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { services } from "./data";
import { ChevronRight } from "@mui/icons-material";
import { Block } from "../../../shared";
import { enqueueSnackbar } from "notistack";

export function AdditionalServicesCard() {
  return (
    <Block>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: "500",
          textAlign: "center",
          marginBottom: "12px",
        }}
      >
        Дополнительные услуги
      </Typography>
      <List sx={{ padding: "0" }}>
        {services.map((service, index) => (
          <ListItem
            onClick={() =>
              !service.soon
                ? Telegram.WebApp.openTelegramLink(service.link)
                : enqueueSnackbar("Эта услуга появится уже совсем скоро", {
                    variant: "warning",
                  })
            }
            key={index}
            sx={{
              cursor: "pointer",
              paddingInline: 0,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              {/* Icon */}
              <ListItemIcon
                sx={{
                  backgroundColor: "secondary.light",
                  minWidth: "32px",
                  minHeight: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              >
                {service.icon}
              </ListItemIcon>
            </Box>

            {/* Text and Chevron with border bottom */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexGrow: 1,
                borderBottom:
                  index !== services.length - 1
                    ? `1px solid ${
                        Telegram.WebApp.colorScheme === "dark"
                          ? "rgba(56, 76, 96, 1)"
                          : "rgba(239, 239, 243, 1)"
                      }`
                    : "none",
                paddingBottom: "8px",
              }}
            >
              <ListItemText
                sx={{ margin: 0 }}
                primary={<Typography>{service.title}</Typography>}
                secondary={
                  service.description && (
                    <Typography sx={{ opacity: ".5", fontSize: "12px" }}>
                      {service.description}
                    </Typography>
                  )
                }
              />
              <ChevronRight sx={{ color: "#b0b0b0", marginLeft: "auto" }} />
            </Box>
          </ListItem>
        ))}
      </List>
    </Block>
  );
}
