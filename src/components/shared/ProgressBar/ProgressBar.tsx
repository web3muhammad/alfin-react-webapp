import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  getSegmentStyle,
  getFillStyle,
  textValues,
  getOpacity,
} from "./styles";

interface SegmentedProgressBarProps {
  value: number; // Value from the server
}

export const SegmentedProgressBar: React.FC<SegmentedProgressBarProps> = ({
  value,
}) => {
  const theme = useTheme();

  // Defining the thresholds and colors for each segment
  const thresholds = [1000000, 3000000, 10000000, 20000000];
  const colors = [
    "rgba(47, 188, 47, 1)", // first segment
    "rgba(235, 195, 0, 1)", // second segment
    "rgba(117, 0, 235, 1)", // third segment
    "rgba(188, 47, 94, 1)", // fourth segment
  ];

  const getSegmentFill = (index: number) => {
    if (index === 0) {
      if (value <= 0) {
        return 0.1; // Filling first segment by 15% by default
      }
      return Math.min(value / thresholds[0], 1);
    }

    if (value <= thresholds[index - 1]) {
      return 0;
    }

    if (value > thresholds[index - 1] && value <= thresholds[index]) {
      // Proportionally filling the current segment
      return (
        (value - thresholds[index - 1]) /
        (thresholds[index] - thresholds[index - 1])
      );
    }

    return 1;
  };

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: ".75rem",
        maxWidth: "393px",
        marginInline: "auto",
      }}
    >
      <Box sx={{ display: "flex", height: "12px" }}>
        {Array.from({ length: 4 }, (_, index) => (
          <Box key={index} sx={{ position: "relative", flex: 1, padding: 0 }}>
            <Box sx={getSegmentStyle(index, theme)}>
              <Box sx={getFillStyle(index, getSegmentFill(index), colors)} />
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "15px",
          marginTop: "4px",
        }}
      >
        {textValues.map(({ threshold, text }, index) => (
          <Typography
            key={index}
            sx={{
              fontSize: "10px",
              fontWeight: "500",
              opacity: getOpacity(value, threshold),
            }}
          >
            {text}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};
