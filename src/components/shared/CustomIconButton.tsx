import { Button as MuiIconButton, ButtonProps, Icon } from "@mui/material";

interface IButtonProps extends ButtonProps {}

export const CustomIconButton: React.FC<IButtonProps> = (props) => {
  return (
    <MuiIconButton
      variant="contained"
      {...props}
      sx={{
        width: "32px",
        height: "32px",
        minWidth: "32px",
        borderRadius: "50%",
        background: "primary.main",
        boxShadow: "none",
        ":hover": {
          background: "primary.main",
        },
        ...props.sx,
      }}
    >
      <Icon
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {props.children}
      </Icon>
    </MuiIconButton>
  );
};
