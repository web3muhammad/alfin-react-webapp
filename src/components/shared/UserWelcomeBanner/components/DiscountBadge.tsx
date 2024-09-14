import { Box, Typography } from "@mui/material";

interface DiscountBadgeProps {
  discount: string;
}

export const DiscountBadge: React.FC<DiscountBadgeProps> = ({ discount }) => (
  <Box
    sx={{
      background: "rgba(0, 202, 72, 0.16)",
      padding: "4px 4px",
      borderRadius: "5px",
    }}
  >
    <Typography sx={{ color: "rgba(0, 202, 72, 1)", fontSize: "11px" }}>
      {`${discount}%`}
    </Typography>
  </Box>
);
