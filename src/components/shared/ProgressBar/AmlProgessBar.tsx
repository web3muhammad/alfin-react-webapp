import { Box, Typography, useTheme, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

interface AmlProgressBarProps {
  riskPercent: number;
  riskLabel: string;
}

export function AmlProgessBar({ riskPercent, riskLabel }: AmlProgressBarProps) {
  const theme = useTheme();
  // Arc color depending on the percentage
  let arcColor = "#2FBC2F";
  if (riskPercent >= 70) arcColor = "#FF3B30";
  else if (riskPercent >= 40) arcColor = "#EBC300";

  // SVG Parameters
  const size = 260;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius;

  // Animation
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const prevPercent = useRef(riskPercent);

  // EaseOutCubic function
  function easeOutCubic(x: number) {
    return 1 - Math.pow(1 - x, 3);
  }

  useEffect(() => {
    let frame: number;
    const duration = 1200;
    const start = performance.now();
    const from = prevPercent.current;
    const to = riskPercent;
    function animate(now: number) {
      const elapsed = now - start;
      const linear = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(linear);
      const value = from + (to - from) * eased;
      setAnimatedPercent(value);
      if (linear < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setAnimatedPercent(to);
        prevPercent.current = to;
      }
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [riskPercent]);

  const progress = Math.max(0, Math.min(100, animatedPercent));
  const offset = circumference * (1 - progress / 100);

  const bgArc = theme.palette.mode === "dark" ? "#232323" : "#E0E0E0";
  const textColor = theme.palette.mode === "dark" ? "#fff" : "#232323";

  return (
    <Box
      sx={{
        width: size,
        height: size / 2,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "none",
        mb: 3,
      }}
    >
      <svg
        width={size}
        height={size / 2}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {/* Фоновая дуга */}
        <path
          d={`M ${strokeWidth / 2},${size / 2} A ${radius},${radius} 0 0 1 ${
            size - strokeWidth / 2
          },${size / 2}`}
          fill="none"
          stroke={bgArc}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Прогресс дуга */}
        <path
          d={`M ${strokeWidth / 2},${size / 2} A ${radius},${radius} 0 0 1 ${
            size - strokeWidth / 2
          },${size / 2}`}
          fill="none"
          stroke={arcColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      {/* Центрированный текст */}
      <Box
        sx={{
          position: "absolute",
          top: "80%",
          left: "50%",
          transform: "translate(-50%, -30%)",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: 56,
            lineHeight: 1,
          }}
        >
          {Math.round(animatedPercent)}%
        </Typography>
        <Typography
          sx={{
            color: arcColor,
            fontWeight: 600,
            fontSize: 16,
            mt: 1,
          }}
        >
          {riskLabel}
        </Typography>
      </Box>
    </Box>
  );
}
