import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  getSegmentStyle,
  getFillStyle,
  textValues,
  getOpacity,
} from "./ProgressBarStyles";

interface SegmentedProgressBarProps {
  value: number; // Value from the server
}

const SegmentedProgressBar: React.FC<SegmentedProgressBarProps> = ({
  value,
}) => {
  const theme = useTheme();

  // Define the thresholds and colors for each segment
  const thresholds = [100000, 500000, 1000000];
  const colors = [
    "rgba(47, 188, 47, 1)", // Color for first segment
    "rgba(235, 195, 0, 1)", // Color for second segment
    "rgba(117, 0, 235, 1)", // Color for third segment
    "rgba(188, 47, 94, 1)", // Color for fourth segment
  ];
  const widths = [87, 87, 87, 87]; // Widths of each segment in pixels

  // Calculate the proportional fill for each segment
  const getSegmentFill = (index: number) => {
    if (index === 0) {
      return 1; // First segment is always filled
    }
    if (value <= thresholds[index - 1]) {
      return 0;
    }
    if (value > thresholds[index - 1] && value <= thresholds[index]) {
      return (
        (value - thresholds[index - 1]) /
        (thresholds[index] - thresholds[index - 1])
      );
    }
    return 1;
  };

  return (
    <Box sx={{ width: "100%", marginTop: "1rem" }}>
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
          paddingLeft: "26%",
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

export default SegmentedProgressBar;
