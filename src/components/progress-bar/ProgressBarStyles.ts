import { SxProps, Theme } from "@mui/material";

// Define styles for each segment
export const getSegmentStyle = (index: number, theme: Theme): SxProps => ({
  width: 87,
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.secondary.main
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
  { threshold: 100000, text: "100 000₽ • 5%" },
  { threshold: 500000, text: "500 000₽ • 7%" },
  { threshold: 1000000, text: "1 000 000₽ • 10%" },
];

// Helper function to determine opacity
export const getOpacity = (value: number, threshold: number): string => {
  return value >= threshold ? "1" : ".5";
};
