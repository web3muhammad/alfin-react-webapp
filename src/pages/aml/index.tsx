import {
  Box,
  CircularProgress,
  Fade,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../../components/shared";
import { useEffect, useState } from "react";
import { useTelegram } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getAmlStats } from "../../services/aml/stats";
import { getDeclinedWord } from "../../utils";
import { checkAddress } from "../../services/aml/check-address";
import { useNavigation } from "../../contexts/NavigationContext";

const schema = yup.object({
  trc20_wallet: yup
    .string()
    .matches(/^T[1-9A-HJ-NP-Za-km-z]{33}$/, "Введите правильно адрес кошелька.")
    .required("Поле с адресом кошелька нужно заполнить"),
});

type FormData = {
  trc20_wallet: string;
};

export function AmlPage() {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { setIsNavigationVisible } = useNavigation();

  const navigate = useNavigate();
  const { tg } = useTelegram();
  const theme = useTheme();

  const { data: amlStats } = useQuery("amlStats", getAmlStats);

  const amlAttemptsLeft = amlStats?.remaining_checks ?? 0;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { mutate: checkAddressMutation, isLoading } = useMutation(
    checkAddress,
    {
      onSuccess: (data) => {
        navigate("/aml-result", {
          state: {
            amlResult: {
              ...data,
              risk_score: data.risk_score || 35, // если нет, используем дефолтное значение
              risk_level: data.risk_level || "low",
              address: {
                ...data.address,
                address: data.address?.address || "Адрес не найден",
                network: data.address?.network || "TRON",
                first_tx_date: "Нет",
                last_tx_date: "Нет",
                tx_count: "Нет",
              },
            },
          },
        });
      },
    }
  );

  const onSubmit = (data: FormData) => {
    checkAddressMutation(data.trc20_wallet);
  };

  useEffect(() => {
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", () => navigate(`/`));

    return () => {
      tg.BackButton.hide();
      tg.offEvent("backButtonClicked", () => navigate(`/`));
    };
  }, [navigate, tg]);

  useEffect(() => {
    setIsNavigationVisible(!isInputFocused);
  }, [isInputFocused, setIsNavigationVisible]);

  return (
    <Fade in>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          paddingTop: "20%",
          paddingBottom: "0",
        }}
      >
        <Box
          component="img"
          sx={{
            position: "absolute",
            top: "0",
            maxWidth: "400px",
            height: "auto",
            objectFit: "cover",
          }}
          src={"/aml-icon.png"}
        />
        <Box sx={{ marginTop: "200px", width: "100%" }}>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            AML-проверка
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              textAlign: "center",
              marginBottom: "24px",
            }}
          >
            Проверьте свой кошелек на AML-статус, чтобы обеспечить законность и
            безопасность операций
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor:
                  theme.palette.mode === "dark" ? "#3C3C3F" : "#ffffff",
                borderRadius: "16px",
                padding: "12px 16px",
              }}
            >
              <Typography
                sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }}
              >
                Адрес кошелька
              </Typography>
              <TextField
                placeholder="Введите кошелек"
                {...register("trc20_wallet")}
                error={!!errors.trc20_wallet}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                sx={{
                  width: "60%",
                  input: {
                    paddingBlock: "2px",
                    paddingLeft: "10px",
                    textAlign: "right",
                    color: theme.palette.mode === "dark" ? "#fff" : "#000",
                    "&::placeholder": {
                      color: theme.palette.mode === "dark" ? "#fff" : "#000",
                      opacity: 0.5,
                    },
                  },
                  "& fieldset": { border: "none" },
                  "& .MuiFormHelperText-root": {
                    position: "absolute",
                    bottom: "-20px",
                  },
                }}
              />
            </Box>
            <Typography
              sx={{
                color: "red",
                marginTop: "4px",
                fontSize: "12px",
                marginLeft: "10px",
              }}
            >
              {errors.trc20_wallet?.message}
            </Typography>
            <Button
              type="submit"
              fullWidth
              disabled={!isValid || isLoading || amlAttemptsLeft === 0}
              sx={{
                marginTop: "12px",
              }}
            >
              {isLoading ? <CircularProgress size={20} /> : "Проверить кошелек"}
            </Button>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                marginTop: "16px",
                textAlign: "center",
                opacity: 0.5,
              }}
            >
              Осталось {amlAttemptsLeft} {getDeclinedWord(amlAttemptsLeft)} в
              этом месяце
            </Typography>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
}
