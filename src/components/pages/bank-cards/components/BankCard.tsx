import { Box, Divider, Typography } from "@mui/material";
import { Block } from "../../../shared";
import { BankCard as BankCardProps } from "../../../../services/bank-cards/interface";
import { useNavigate } from "react-router-dom";

export function BankCard({
  account_name,
  currency,
  card_number,
  trc_20,
  iban,
  owner_name,
  id,
}: BankCardProps) {
  const navigate = useNavigate();
  return (
    <Block
      onClick={() =>
        navigate("/add-card", {
          state: {
            formType: "edit",
            cardId: id,
            bankName: account_name,
            currency,
            cardNumber: card_number,
            ownerName: owner_name,
          },
        })
      }
      sx={{ paddingInline: 0 }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: "16px",
        }}
      >
        <Typography>{account_name}</Typography>
        <Typography sx={{ color: "primary.main" }}>{currency}</Typography>
      </Box>
      <Divider sx={{ marginBlock: "5px" }} />
      <Box
        sx={{
          paddingInline: "16px",
        }}
      >
        <Typography sx={{ fontSize: "15px" }}>
          {currency === "USDT"
            ? trc_20
            : currency === "TRY"
            ? iban
            : String(card_number).replace(/(\d{4})(?=\d)/g, "$1 ")}
        </Typography>
        <Typography sx={{ fontSize: "12px", color: "rgba(140, 140, 141, 1)" }}>
          {owner_name}
        </Typography>
      </Box>
    </Block>
  );
}
