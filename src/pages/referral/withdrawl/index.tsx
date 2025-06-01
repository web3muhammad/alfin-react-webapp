import React, { useEffect } from "react";
import {
  Box,
  Divider,
  TextField,
  Typography,
  CircularProgress,
  Fade,
} from "@mui/material";
import { Block, Button, Title } from "../../../components/shared";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../../../hooks";
import { useMutation } from "react-query";
import { withdrawMoney } from "../../../services/withdraw";
import { enqueueSnackbar } from "notistack";

interface WithdrawFormData {
  amount: string;
  wallet: string;
}

export function WithdrawlPage() {
  const navigate = useNavigate();
  const { tg } = useTelegram();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WithdrawFormData>();

  const { mutate: withdrawMoneyMutation, isLoading } = useMutation({
    mutationFn: withdrawMoney,
    onSuccess: () => {
      navigate(`/referral`);
      enqueueSnackbar("Запрос на вывод средств отправлен", {
        variant: "success",
      });
    },
    onError: () => {
      // navigate(`/referral`);
    },
  });

  const onSubmit = async ({ amount, wallet }: WithdrawFormData) => {
    try {
      withdrawMoneyMutation({
        amount: Number(amount),
        wallet,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", () => navigate(`/referral`));

    return () => {
      tg.BackButton.hide();
      tg.offEvent("backButtonClicked", () => navigate(`/referral`));
    };
  }, [navigate, tg]);

  const isDisabled = watch("amount") === "" || watch("wallet") === "";

  return (
    <Fade in>
      <Box sx={{ width: "100%", marginTop: "100px" }}>
        <Title>Вывод средств</Title>
        <Block>
          <Box component="form">
            {/* Amount Input */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Typography>Сумма вывода</Typography>
              <TextField
                placeholder="0 ₽"
                sx={{
                  width: "60%",
                  input: {
                    paddingBlock: "2px",
                    paddingLeft: "10px",
                    textAlign: "right",
                  },
                  "& fieldset": { border: "none" },
                }}
                {...register("amount", {
                  required: "Обязательно для ввода",
                })}
                error={!!errors.amount}
                helperText={errors.amount?.message}
                fullWidth
              />
            </Box>
            <Divider sx={{ margin: "12px 0px" }} />

            {/* Wallet Input */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Typography>Кошелек</Typography>
              <TextField
                placeholder="Введите кошелек"
                sx={{
                  width: "60%",
                  input: {
                    paddingBlock: "2px",
                    paddingLeft: "10px",
                    textAlign: "right",
                  },
                  "& fieldset": { border: "none" },
                }}
                {...register("wallet", {
                  required: "Обязательно для ввода",
                })}
                error={!!errors.wallet}
                helperText={errors.wallet?.message}
                fullWidth
              />
            </Box>
          </Box>
        </Block>

        <Button
          onClick={handleSubmit(onSubmit)}
          sx={{ marginTop: "1.5rem" }}
          type="submit"
          disabled={isDisabled}
        >
          {isLoading ? (
            <CircularProgress size={25} sx={{ color: "#fff" }} />
          ) : (
            "Вывести средства"
          )}
        </Button>
      </Box>
    </Fade>
  );
}
