import {
  Typography as MuiTypography,
  Typography,
  TypographyProps,
} from "@mui/material";

interface ITitleProps extends TypographyProps {}

export const Title = (props: ITitleProps) => (
  <Typography
    {...props}
    sx={{
      fontSize: "24px",
      fontWeight: "600",
      textAlign: "center",
      paddingBottom: "1.25rem",
      ...props.sx,
    }}
  >
    {props.children}
  </Typography>
);
