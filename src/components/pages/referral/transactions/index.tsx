import { Box, Divider, Typography, useTheme } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Block } from "../../../shared";

export interface Transaction {
  type: "reward" | "withdraw";
  title: string;
  date: string;
  amount: number;
}

interface ReferralTransactionsProps {
  transactions: Transaction[];
}

export function ReferralTransactions({ transactions }: ReferralTransactionsProps) {
  const theme = useTheme();

  return (
    <Block
      sx={{
        mt: 1.25,
        borderRadius: "16px",
        padding: "18px 15px",
        height: transactions.length === 0 ? "180px" : "auto",
      }}
    >
      {transactions.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 13,
              textAlign: "center",
              opacity: 0.5,
            }}
          >
            У вас еще нет ни одной транзакции
          </Typography>
        </Box>
      ) : (
        transactions.map((tx, idx) => (
          <Box key={idx} sx={{ display: "flex", alignItems: "start", py: 0.5 }}>
            <Box
              sx={{
                mt: 0.25,
                width: 32,
                height: 32,
                borderRadius: "50%",
                bgcolor:
                  theme.palette.mode === "dark" ? "#3C3C3F" : "#e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 1.5,
              }}
            >
              {tx.type === "reward" ? (
                <ArrowDownwardIcon sx={{ color: "#888", fontSize: 20 }} />
              ) : (
                <ArrowUpwardIcon sx={{ color: "#888", fontSize: 20 }} />
              )}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    {tx.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 10,
                      opacity: 0.5,
                    }}
                  >
                    {tx.date}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 400,
                    color:
                      tx.amount > 0
                        ? "#3DDC5A"
                        : theme.palette.text.primary,
                    textAlign: "right",
                  }}
                >
                  {tx.amount > 0 ? `+${tx.amount}₽` : `${tx.amount}₽`}
                </Typography>
              </Box>

              <Divider
                sx={{
                  display:
                    idx === transactions.length - 1 ? "none" : "block",
                  marginBlock: "8px",
                  borderColor:
                    theme.palette.mode === "dark"
                      ? "#3C3C3F"
                      : "#e0e0e0",
                }}
              />
            </Box>
          </Box>
        ))
      )}
    </Block>
  );
} 