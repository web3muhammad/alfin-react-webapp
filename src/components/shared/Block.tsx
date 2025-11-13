import { Box as MuiBox, BoxProps } from "@mui/material";

interface IBlockProps extends BoxProps {}

export const Block: React.FC<IBlockProps> = (props) => {
  return (
    <MuiBox
      {...props}
      sx={{
        width: "100%",
        backgroundColor: "secondary.main",
        borderRadius: "24px",
        padding: "16px",
        ...props.sx,
      }}
    >
      {props.children}
    </MuiBox>
  );
};
