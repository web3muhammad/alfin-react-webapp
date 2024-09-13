import { Box, Typography } from "@mui/material";

interface RateCard {
  code: string;
  name: string;
  value: number;
  color: string;
}

export function RateCard({ code, name, value, color }: RateCard) {
  return (
    <Box sx={{ display: "flex", gap: "6px" }}>
      <Box
        sx={{
          width: "32px",
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px",
        }}
      >
        <Typography
          sx={{
            fontSize: "10px",
            fontWeight: "700",
            color: "#fff",
            textTransform: "uppercase",
          }}
        >
          {code}
        </Typography>
      </Box>
      <Typography sx={{ fontWeight: "500" }}>
        {name} • {value}
        {code === "RUB" ? "₮" : "₽"}
      </Typography>
    </Box>
  );
}
