import { Button as MuiButton, ButtonProps } from "@mui/material";

interface IButtonProps extends ButtonProps {}

export const Button: React.FC<IButtonProps> = (props) => {
  return (
    <MuiButton
      variant="contained"
      {...props}
      sx={{
        fontFamily: "Inter",
        width: "100%",
        padding: "8px 10px",
        minHeight: "40px",
        backgroundColor: "primary.main",
        borderRadius: "8px",
        color: "#fff",
        textTransform: "none",
        fontWeight: "500",
        boxShadow: "none",
        ":hover": {
          boxShadow: "none",
        },
        ...props.sx,
      }}
    >
      {props.children}
    </MuiButton>
  );
};
