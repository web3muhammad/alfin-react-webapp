import { Box, IconButton, Typography, useTheme } from "@mui/material";
import {
  HistoryIconNav,
  HomeIconNav,
  ProfileIconNav,
  SupportIconNav,
} from "../../icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isIOS = Telegram.WebApp.platform === "ios";

  const { isHome, isHistory, isProfile } = useMemo(
    () => ({
      isHome: location.pathname === "/",
      isHistory: location.pathname === "/history",
      isProfile: location.pathname === "/profile",
    }),
    [location.pathname]
  );

  const navLinks = useMemo(
    () => [
      {
        label: "Главная",
        icon: <HomeIconNav selected={isHome} />,
        path: "/",
        isSelected: isHome,
      },
      {
        label: "История",
        icon: <HistoryIconNav selected={isHistory} />,
        path: "/history",
        isSelected: isHistory,
      },
      {
        label: "Профиль",
        icon: <ProfileIconNav selected={isProfile} />,
        path: "/profile",
        isSelected: isProfile,
      },
      {
        label: "Поддержка",
        icon: <SupportIconNav selected={false} />,
        path: "support",
        isSelected: false,
      },
    ],
    [isHome, isHistory, isProfile]
  );

  const handleClick = (path: string) => {
    if (path === "support") {
      Telegram.WebApp.openTelegramLink("https://t.me/alfin_manager");
    } else {
      navigate(path);
    }
  };

  const bottomPadding = isIOS ? "env(safe-area-inset-bottom)" : "0px";

  return (
    <>
      {/* Blur layer */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 99997,
          height: `calc(90px + ${bottomPadding})`,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      />
      {/* Background layer */}
      <Box
        component="nav"
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 99998,
          height: `calc(90px + ${bottomPadding})`,
          bgcolor:
            theme.palette.mode === "dark"
              ? "rgba(28, 28, 29, 0.75)"
              : "rgba(255, 255, 255, 0.75)",
          borderTop: `1px solid ${
            theme.palette.mode === "dark" ? "#3C3C3F" : "rgba(0, 0, 0, 0.1)"
          }`,
        }}
      />
      {/* Content layer */}
      <Box
        component="nav"
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 99999,
          height: `calc(90px + ${bottomPadding})`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          pb: isIOS ? `calc(24px + ${bottomPadding})` : "16px",
          pt: 3,
          background: "transparent",
        }}
      >
        {navLinks.map((link) => (
          <IconButton
            key={link.label}
            onClick={() => handleClick(link.path)}
            disableRipple
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              color: "inherit",
              padding: "8px",
              minWidth: "64px",
              height: "58px",
              borderRadius: "14px",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              overflow: "hidden",
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
              userSelect: "none",
              willChange: "transform, opacity",
              transform: "translateZ(0)",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.05)",
                borderRadius: "0px",
                opacity: link.isSelected ? 1 : 0,
                transform: link.isSelected ? "scale(1)" : "scale(0.8)",
                transition:
                  "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
                willChange: "opacity, transform",
              },
              "@media (hover: hover)": {
                "&:hover": {
                  transform: "translateY(-2px) translateZ(0)",
                  "&::before": {
                    opacity: 1,
                    transform: "scale(1)",
                  },
                },
              },
              "@media (hover: none)": {
                "&:active": {
                  transform: "scale(0.95) translateZ(0)",
                },
              },
            }}
          >
            <Box
              className="nav-icon"
              sx={{
                transition: "transform 0.2s ease-in-out",
                transform: link.isSelected
                  ? "scale(1.1) translateZ(0)"
                  : "scale(1) translateZ(0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                willChange: "transform",
                opacity: 1,
                pt: 0.5,
              }}
            >
              {link.icon}
            </Box>
            <Typography
              variant="caption"
              sx={{
                fontSize: "10px",
                color: link.isSelected
                  ? "primary.main"
                  : theme.palette.mode === "dark"
                  ? "rgba(235, 235, 245, 0.6)"
                  : "rgba(0, 0, 0, 0.6)",
                transition: "color 0.2s ease-in-out",
                fontWeight: link.isSelected ? 500 : 400,
                display: "block",
                opacity: 1,
                pb: 0.5,
              }}
            >
              {link.label}
            </Typography>
          </IconButton>
        ))}
      </Box>
    </>
  );
}
