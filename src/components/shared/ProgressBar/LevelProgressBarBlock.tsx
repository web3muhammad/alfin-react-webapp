import { Box, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { getUserInfo } from "../../../services/me";
import { GetUserInfoResponse } from "../../../services/me/interface";
import { isMobileWebApp } from "../../../utils";

export function LevelProgressBarBlock() {
  const { data } = useQuery<GetUserInfoResponse>({
    queryFn: getUserInfo,
    queryKey: ["user-info"],
    refetchOnWindowFocus: false,
  });

  const volume = data?.volume || 0;

  // Using the same thresholds as in ProgressBar
  const thresholds = [100000, 3000000, 10000000, 20000000];

  const getLevel = () => {
    if (volume <= thresholds[0]) return 1;
    if (volume <= thresholds[1]) return 2;
    if (volume <= thresholds[2]) return 3;
    return 4;
  };

  const getSegmentFill = () => {
    if (volume <= 0) {
      return 0.1; // Default 10% fill
    }
    return Math.min(volume / thresholds[0], 1);
  };

  const isLight = Telegram.WebApp.colorScheme === "light";

  return (
    <Box
      sx={{
        position: "fixed",
        top: `calc(var(--tg-safe-area-inset-top) + 8px)`,
        right: "25%",
        zIndex: 99999,
        borderRadius: "14px",
        padding: "4px 10px",
        height: "30px",
        display: !isMobileWebApp ? "flex" : "none",
        alignItems: "center",
        gap: "8px",
        transform: "translateZ(0)",
        willChange: "backdrop-filter, background-color",
        transition: "all 0.2s ease-out",
        backdropFilter: "blur(55px)",
        WebkitBackdropFilter: "blur(55px)",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        color: "#fff",
      }}
    >
      {/* Circular Progress Bar */}
      <Box
        sx={{
          width: 20,
          height: 20,
          position: "relative",
          transform: "translateZ(0)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: `2px solid ${
              isLight ? "rgba(60, 60, 67, 0.18)" : "rgba(255, 255, 255, 0.25)"
            }`,
            position: "absolute",
            transition: "border-color 0.2s ease-out",
          }}
        />
        <Box
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: `2px solid ${isLight ? "rgb(60, 60, 67)" : "#FFFFFF"}`,
            position: "absolute",
            clipPath: `polygon(50% 50%, -50% -50%, ${
              getSegmentFill() * 200
            }% -50%)`,
            transform: "rotate(-90deg)",
            transition: "border-color 0.2s ease-out",
          }}
        />
      </Box>

      {/* Level text */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          transform: "translateZ(0)",
        }}
      >
        <Typography
          fontWeight={500}
          fontSize={11}
          letterSpacing={-0.3}
          sx={{
            color: isLight ? "rgb(60, 60, 67)" : "#FFFFFF",
            lineHeight: 1.2,
            transition: "color 0.2s ease-out",
          }}
        >
          Уровень {getLevel()}
        </Typography>

        <Typography
          fontWeight={400}
          fontSize={10}
          sx={{
            opacity: 0.6,
            lineHeight: 1.1,
            color: isLight ? "rgb(60, 60, 67)" : "#FFFFFF",
            transition: "color 0.2s ease-out",
          }}
        >
          {volume} ₽
        </Typography>
      </Box>
    </Box>
  );
}
