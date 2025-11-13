import { Button as MuiButton, ButtonProps } from "@mui/material";

interface IButtonProps extends ButtonProps {
  disableGlassEffect?: boolean;
}

export const Button: React.FC<IButtonProps> = (props) => {
  const { disableGlassEffect, ...rest } = props;
  const boxShadow = disableGlassEffect ? "none" : 
    "-0.5px 0.5px 1px 0 rgba(51, 119, 255, 0.60) inset, 0.5px -0.5px 1px 0 rgba(51, 119, 255, 0.60) inset, 0.5px 0.5px 1px 0 #FFF inset, -0.5px -0.5px 1px 0 #FFF inset, 0 5px 30px 0 rgba(0, 0, 0, 0.25)";
  const hoverBoxShadow = disableGlassEffect ? "none" : 
    "-0.5px 0.5px 1px 0 rgba(51, 119, 255, 0.60) inset, 0.5px -0.5px 1px 0 rgba(51, 119, 255, 0.60) inset, 0.5px 0.5px 1px 0 #FFF inset, -0.5px -0.5px 1px 0 #FFF inset, 0 5px 30px 0 rgba(0, 0, 0, 0.25)";
  return (
    <MuiButton
      variant="contained"
      {...props}
      sx={{
        fontFamily: "Inter",
        width: "100%",
        padding: "10px 10px",
        minHeight: "40px",
        backgroundColor: "primary.main",
        borderRadius: "40px",
        color: "#fff",
        fontSize: "15px",
        fontWeight: 500,
        letterSpacing: "-0.5px",
        textTransform: "none",
        boxShadow,
        ":hover": {
          boxShadow: hoverBoxShadow,
        },
        ...props.sx,
      }}
    >
      {props.children}
    </MuiButton>
  );
};
