import { SxProps, Theme } from "@mui/material";

// Define styles for each segment
export const getSegmentStyle = (index: number, theme: Theme): SxProps => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "#3C3C3F"
      : "rgba(220, 220, 229, 1)", // Background color for non-filled sections
  height: "12px",
  position: "relative",
  overflow: "hidden",
  borderRadius:
    index === 0 ? "8px 4px 4px 8px" : index === 3 ? "4px 8px 8px 4px" : "4px",
  marginRight: index < 3 ? "4px" : 0,
});

// Define styles for the fill of each segment
export const getFillStyle = (
  index: number,
  fillPercentage: number,
  colors: string[]
): SxProps => ({
  width: `${fillPercentage * 100}%`, // Fill percentage
  height: "100%",
  backgroundColor: colors[index],
  position: "absolute",
  top: 0,
  left: 0,
  transition: "width 0.5s ease",
  borderRadius: "3px",
});

// Define thresholds and text values
export const textValues = [
  { threshold: 100000, text: "100K • 5%" },
  { threshold: 3000000, text: "3МЛН • 10%" },
  { threshold: 10000000, text: "10МЛН • 15%" },
  { threshold: 20000000, text: "20МЛН • 20%" },
];

// Helper function to determine opacity
export const getOpacity = (value: number, threshold: number): string => {
  return value >= threshold ? "1" : ".5";
};
