import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Divider,
  styled,
  Tabs,
  Tab,
  TabProps,
  useTheme,
} from "@mui/material";
import { BorderRight, SwapVertRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Block, Button } from "../../../shared";
import { formatNumber } from "../../../../utils";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useMutation, useQuery } from "react-query";
import { getAllCurrencies } from "../../../../services/currencies";
import { getCurrenciesPairs } from "../../../../services/currencies/pairs";

import { debounce } from "lodash";
import {
  fetchExchangeRate,
  FetchExchangeRateResponse,
} from "../../../../services/exchange-rate";
import { enqueueSnackbar } from "notistack";

// Плавные Tabs для выбора способа оплаты
const AnimatedTabs = styled(Tabs)(({ theme }) => ({
  borderRadius: "999px",
  backgroundColor: theme.palette.secondary.light,
  padding: 4,
  marginBottom: "6px",
  minHeight: "36px",
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    transition: "all 0.3s ease",
  },
}));

const AnimatedTab = styled((props: TabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  flex: 1,
  padding: "8px 12px !important",
  color: theme.palette.text.secondary,
  transition: "color 0.3s, background-color 0.3s",
  minHeight: "28px",
  borderRadius: "30px",
  "&.Mui-selected": {
    backgroundColor: theme.palette.mode === "dark" ? "#2C2C2E" : "#ffffff9c",
    color: theme.palette.mode === "dark" ? "#fff" : "#000",
  },
}));

export const CurrencyExchangeWidget: React.FC = () => {
  const [inputAmount1, setInputAmount1] = useState("");
  const [inputAmount2, setInputAmount2] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [buyAmountWithoutPercentage, setBuyAmountWithoutPercentage] = useState<
    number | undefined
  >();
  const [input1Error, setInput1Error] = useState("");
  const [input2Error, setInput2Error] = useState("");

  const [anchorEl1, setAnchorEl1] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const [selectedMainCurrency, setSelectedMainCurrency] = useState("RUB");
  const [selectedExchangeCurrency, setSelectedExchangeCurrency] =
    useState("TRY");
  const [exchangeRate, setExchangeRate] = useState(0);
  const [showRate, setShowRate] = useState(0);
  const [mainCurrencySellLimit, setMainCurrencySellLimit] = useState(20000);
  const [mainLimitError, setMainLimitError] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [justChangedInputId, setJustChangedInputId] = useState(0);
  const [shouldRequestManager, setShouldRequestManager] =
    useState<boolean>(false);
  const [requestManagerError, setRequestManagerError] = useState("");
  const [paymentType, setPaymentType] = useState<"CARD" | "CASH">("CARD");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const theme = useTheme();

  const handlePaymentChange = (_: React.SyntheticEvent, newType: string) => {
    if (selectedMainCurrency === "USDT") {
      enqueueSnackbar("Операции с USDT обрабатываются только переводом", {
        variant: "warning",
      });
      return;
    }
    if (newType && (newType === "CARD" || newType === "CASH")) {
      setPaymentType(newType);
    }
  };

  // При изменении способа оплаты пересылаем запрос с актуальным paymentType
  useEffect(() => {
    if (!inputAmount1 && !inputAmount2) return;

    setIsTyping(true);
    setShouldRequestManager(false);
    setRequestManagerError("");
    setInput1Error("");
    setInput2Error("");

    const sellAmountParam = Number(inputAmount1.replace(/\s/g, ""));

    fetchRate({
      sellCurrency: selectedMainCurrency,
      buyCurrency: selectedExchangeCurrency,
      sellAmount: sellAmountParam,
    })
      .then(
        ({
          rate,
          buy_amount,
          show_rate,
          discount_percentage,
          buy_amount_without_discount,
        }) => {
          setExchangeRate(rate);
          if (buy_amount != null) {
            setInputAmount2(formatNumber(String(buy_amount)));
          }
          setShowRate(show_rate);
          setDiscountPercentage(discount_percentage);
          setBuyAmountWithoutPercentage(buy_amount_without_discount);
        }
      )
      .catch((e) => {
        if (e.status === 404) {
          setShouldRequestManager(true);
          setRequestManagerError(e.response?.data?.detail ?? "Ошибка запроса");
        }

        if (e.status === 400) {
          const detail = e.response?.data?.detail || "Ошибка лимита";
          enqueueSnackbar(detail, { variant: "error" });
          if (justChangedInputId === 1) setInputAmount2("");
          else setInputAmount1("");
          if (justChangedInputId === 1) setInput1Error(detail);
          else setInput2Error(detail);
        }
      });
  }, [paymentType]);

  const { mutateAsync: fetchRate, isLoading } = useMutation(
    async ({
      sellCurrency,
      buyCurrency,
      sellAmount,
      buyAmount,
    }: {
      sellCurrency: string;
      buyCurrency: string;
      sellAmount?: number;
      buyAmount?: number;
    }) => {
      return fetchExchangeRate({
        fromCurrency: sellCurrency,
        toCurrency: buyCurrency,
        ...(sellAmount != null ? { sellAmount } : {}),
        ...(buyAmount != null ? { buyAmount } : {}),
        paymentType,
      });
    },
    {
      onSuccess: ({
        rate,
        show_rate,
        discount_percentage,
        buy_amount_without_discount,
      }) => {
        setExchangeRate(rate);
        setShowRate(show_rate);
        setIsTyping(false);
        setShouldRequestManager(false);
        setInput1Error("");
        setInput2Error("");
        setDiscountPercentage(discount_percentage);
        setBuyAmountWithoutPercentage(buy_amount_without_discount);
      },
      onError(e: any) {
        const detail = e.response?.data?.detail;
        if (e.status === 400) {
          enqueueSnackbar(detail, { variant: "error" });
          if (justChangedInputId === 1) {
            setInputAmount2("");
            setInput1Error(detail);
          } else {
            setInputAmount1("");
            setInput2Error(detail);
          }
        } else if (
          detail === "Валютная пара не найдена" ||
          detail === "Not Found"
        ) {
          enqueueSnackbar("Валютная пара не найдена", { variant: "error" });
        }
      },
    }
  );

  // Debounce для уменьшения количества запросов (с учётом, какой input изменился)
  const debouncedFetchRate = useRef(
    debounce(
      async (
        sell: string,
        buy: string,
        field: number,
        value: string,
        onSuccess: (res: FetchExchangeRateResponse) => void
      ) => {
        try {
          let response: FetchExchangeRateResponse;
          if (field === 1) {
            response = await fetchRate({
              sellCurrency: sell,
              buyCurrency: buy,
              sellAmount: Number(value),
            });
          } else {
            response = await fetchRate({
              sellCurrency: sell,
              buyCurrency: buy,
              buyAmount: Number(value),
            });
          }
          onSuccess(response);
        } catch (e: any) {
          if (e.status === 404) {
            setShouldRequestManager(true);
            setRequestManagerError(
              e.response?.data?.detail || "Ошибка запроса"
            );
          } else if (e.status === 400) {
            const detail = e.response?.data?.detail;
            enqueueSnackbar(detail, { variant: "error" });
            if (field === 1) {
              setInputAmount2("");
              setInput1Error(detail);
            } else {
              setInputAmount1("");
              setInput2Error(detail);
            }
          }
        }
      },
      500
    )
  ).current;

  const { data: allCurrenciesData } = useQuery({
    queryFn: () => getAllCurrencies(),
    queryKey: ["all-currency"],
  });

  const { data: currenciesPairsData } = useQuery({
    queryFn: () =>
      getCurrenciesPairs({ symbol: selectedMainCurrency, rates: true }),
    queryKey: ["currency-pairs", selectedMainCurrency],
    onSuccess(data) {
      const defaultCurrency = data.find(
        (currency) => currency.symbol === selectedMainCurrency
      );
      if (defaultCurrency?.rate) {
        setExchangeRate(defaultCurrency.rate);
      }
    },
  });

  const isDisabledSwap =
    selectedExchangeCurrency === "SAR" ||
    selectedMainCurrency === selectedExchangeCurrency;

  const isDisabled =
    isLoading ||
    isTyping ||
    !inputAmount1 ||
    !inputAmount2 ||
    Number(inputAmount1) === 0 ||
    Number(inputAmount2) === 0 ||
    exchangeRate > Number(inputAmount1) ||
    selectedMainCurrency === selectedExchangeCurrency ||
    mainLimitError;

  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "inputAmount1" | "inputAmount2"
  ) => {
    setMainLimitError(false);

    let value = e.target.value.replace(/\D/g, "");
    if (value.startsWith("0") && value.length > 1) value = value.substring(1);
    setShouldRequestManager(false);
    setRequestManagerError("");
    setIsTyping(true);
    setDiscountPercentage(0);
    setBuyAmountWithoutPercentage(0);
    if (field === "inputAmount1") {
      setInput1Error("");
    } else setInput2Error("");

    if (value.length <= 10) {
      const formattedValue = value === "0.00" ? "0" : formatNumber(value);

      if (field === "inputAmount1") {
        setJustChangedInputId(1);
        setInputAmount1(formattedValue);

        debouncedFetchRate(
          selectedMainCurrency,
          selectedExchangeCurrency,
          1,
          value,
          ({ rate, sell_min_amount, show_rate }) => {
            setExchangeRate(rate);
            setShowRate(show_rate);
            setMainCurrencySellLimit(sell_min_amount);

            const convertedValue = (Number(value) * rate).toFixed(0);

            if (Number(value) <= 0 || Number(convertedValue) <= 0) {
              setMainLimitError(false);
            } else {
              setMainLimitError(sell_min_amount > Number(value));
            }

            setInputAmount2(formatNumber(convertedValue));
          }
        );
      } else {
        setJustChangedInputId(2);
        setInputAmount2(formattedValue);

        debouncedFetchRate(
          selectedMainCurrency,
          selectedExchangeCurrency,
          2,
          value,
          ({ rate, buy_min_amount, show_rate }) => {
            setExchangeRate(rate);
            setShowRate(show_rate);

            const buyAmt = Number(value);
            setMainCurrencySellLimit(buy_min_amount);
            setMainLimitError(buy_min_amount > buyAmt);

            const convertedSell = (buyAmt / rate).toFixed(0);
            setInputAmount1(formatNumber(convertedSell));
          }
        );
      }
    }
  };

  const handleSwapClick = () => {
    setInputAmount1("");
    setInputAmount2("");
    setShowRate(0);
    setShouldRequestManager(false);
    setDiscountPercentage(0);
    setBuyAmountWithoutPercentage(0);

    if (selectedExchangeCurrency === "USDT") {
      setPaymentType("CARD");
    }

    setSelectedMainCurrency(selectedExchangeCurrency);
    setSelectedExchangeCurrency(selectedMainCurrency);

    setIsRotated((prev) => !prev);
    setMainLimitError(false);

    if (inputRef.current) inputRef.current.focus();
  };

  const handleMenu1Open = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl1(e.currentTarget);
  const handleMenu1Close = () => setAnchorEl1(null);
  const handleMenu2Open = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl2(e.currentTarget);
  const handleMenu2Close = () => setAnchorEl2(null);

  const handleCurrencyChange = (
    newMainCurrency: string,
    newExchangeCurrency: string,
    menuTriggered: 1 | 2
  ) => {
    // Сброс старой ошибки лимита
    setMainLimitError(false);

    // Если новая основная валюта — USDT, переключаем способ оплаты на CARD
    if (newMainCurrency === "USDT") {
      setPaymentType("CARD");
    }

    setJustChangedInputId(menuTriggered);
    setSelectedMainCurrency(newMainCurrency);
    setSelectedExchangeCurrency(newExchangeCurrency);
    setInput1Error("");
    setInput2Error("");
    setShouldRequestManager(false);

    // Ранний выход, если поле, из которого будем считать, пустое
    if (menuTriggered === 1 && !inputAmount1) return;
    if (menuTriggered === 2 && !inputAmount2) return;

    // Для запросов всегда используем sellAmount из первого поля
    const sellAmt = Number(inputAmount1.replace(/\s/g, ""));

    fetchRate({
      sellCurrency: newMainCurrency,
      buyCurrency: newExchangeCurrency,
      sellAmount: sellAmt,
    }).then((data) => {
      const {
        rate,
        sell_min_amount,
        buy_min_amount,
        show_rate,
        buy_amount,
        discount_percentage,
        buy_amount_without_discount,
      } = data as FetchExchangeRateResponse & { buy_min_amount?: number };

      // Общие обновления
      setExchangeRate(rate);
      setShowRate(show_rate);
      setDiscountPercentage(discount_percentage);
      setBuyAmountWithoutPercentage(buy_amount_without_discount);

      // Сохраняем текущий лимит исходя из того, из какого поля вызов
      setMainCurrencySellLimit(
        menuTriggered === 1
          ? sell_min_amount
          : buy_min_amount ?? sell_min_amount
      );

      if (menuTriggered === 1) {
        // Пользователь менял первую валюту (sell)
        const converted = (sellAmt * rate).toFixed(0);
        setInputAmount2(formatNumber(converted));
        setMainLimitError(sell_min_amount > sellAmt);
      } else {
        setInputAmount2(formatNumber(String(buy_amount)));

        const buyAmt = Number(inputAmount2.replace(/\s/g, ""));
        setMainLimitError((buy_min_amount ?? 0) > buyAmt);

        const convertedSell = (buyAmt / rate).toFixed(0);
        setInputAmount1(formatNumber(convertedSell));
      }
    });
  };

  useEffect(() => () => debouncedFetchRate.cancel(), []);

  return (
    <Block
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "10px 16px",
        position: "relative",
        zIndex: 999,
      }}
    >
      {/* Input section */}
      <Box sx={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
        <Box sx={{ position: "relative", flex: 1 }}>
          <Box sx={{ display: "flex", gap: "4px", alignItems: "center" }}>
            <Typography>Вы платите</Typography>
            {allCurrenciesData && (
              <Box
                component="img"
                src={
                  allCurrenciesData?.find(
                    (currency) => currency.symbol === selectedMainCurrency
                  )?.icon
                }
                sx={{ width: "32px", height: "16px" }}
              />
            )}
            <Typography>
              {justChangedInputId === 2 &&
                showRate !== 0 &&
                showRate.toFixed(2)}
            </Typography>
          </Box>

          <TextField
            inputRef={inputRef}
            placeholder="0"
            type="tel"
            value={inputAmount1}
            onChange={(e) => handleAmountChange(e as any, "inputAmount1")}
            variant="outlined"
            slotProps={{
              htmlInput: {
                maxLength: 10,
              },
              formHelperText: {
                sx: {
                  marginLeft: "0 !important",
                  marginTop: "0 !important",
                  fontFamily: '"Inter",system-ui',
                },
              },
            }}
            sx={{
              width: "100%",
              input: {
                border: "none",
                fontSize: "3rem",
                fontWeight: "medium",
                padding: "0",
                color: input1Error ? "#FF3C14" : "unset",
              },
              "& fieldset": { border: "none" },
            }}
          />
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center" }}
          onClick={(e) => handleMenu1Open(e)}
        >
          <Typography
            sx={{
              fontSize: "25px",
              fontWeight: "500",
              marginLeft: "8px",
              cursor: "pointer",
              color: "rgba(140, 140, 141, 1)",
            }}
          >
            {selectedMainCurrency}
          </Typography>
          <ArrowForwardIosIcon
            sx={{ fontSize: "22px", color: "rgba(140, 140, 141, 1)" }}
          />
        </Box>
      </Box>

      <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
        {/* Divider */}
        <Divider
          sx={{
            borderColor: `${theme.palette.mode === "dark" ? "#3C3C3F" : "#EFEFF3"}`,
            flex: 1,
            margin: "0 -16px",
          }}
        />

        {/* Swap icon positioned absolutely */}
        <IconButton
          disabled={isDisabledSwap}
          sx={{
            position: "absolute",
            right: "16px",
            backgroundColor: "secondary.main",
            border: `1px solid ${theme.palette.mode === "dark" ? "#3C3C3F" : "#EFEFF3"}`,
            ":hover": {
              backgroundColor: "secondary.main",
            },
            transition: "transform 0.25s ease-in-out",
            transform: isRotated ? "rotate(180deg)" : "rotate(0deg)",
          }}
          onClick={handleSwapClick}
        >
          <SwapVertRounded color="primary" />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
        <Box sx={{ position: "relative", flex: 1 }}>
          <Box sx={{ display: "flex", gap: "4px", alignItems: "center" }}>
            <Typography>Вы получите</Typography>
            {currenciesPairsData && (
              <Box
                component="img"
                src={
                  allCurrenciesData?.find(
                    (currency) => currency.symbol === selectedExchangeCurrency
                  )?.icon ||
                  currenciesPairsData?.find(
                    (currency) => currency.symbol === selectedExchangeCurrency
                  )?.icon
                }
                sx={{ width: "32px", height: "16px" }}
              />
            )}
            <Typography
              sx={{
                color:
                  paymentType === "CASH" &&
                  !isLoading &&
                  inputAmount2 !== "" &&
                  !shouldRequestManager
                    ? "#00CA48"
                    : "text.primary",
              }}
            >
              {justChangedInputId === 1 &&
                showRate !== 0 &&
                showRate.toFixed(2)}
            </Typography>
          </Box>
          <TextField
            multiline={shouldRequestManager}
            minRows={shouldRequestManager ? 2 : 1}
            placeholder="0"
            type="tel"
            value={shouldRequestManager ? requestManagerError : inputAmount2}
            onChange={(e) => handleAmountChange(e as any, "inputAmount2")}
            variant="outlined"
            disabled={shouldRequestManager}
            slotProps={{
              input: {
                sx: {
                  p: 0,
                  "& .MuiOutlinedInput-input": {
                    paddingBlock: "5px",
                    paddingInline: "0",
                  },
                  "& .MuiOutlinedInput-inputMultiline": {
                    paddingBlock: "10px",
                  },
                  fontSize: shouldRequestManager ? "14px" : "unset",
                },
              },
              htmlInput: {
                maxLength: 10,
                readOnly: isDisabledSwap || shouldRequestManager,
                style: {
                  whiteSpace: shouldRequestManager ? "pre-wrap" : "nowrap",
                  wordBreak: shouldRequestManager ? "break-word" : "normal",
                },
              },
            }}
            sx={{
              width: "100%",
              padding: "0 !important",
              input: {
                border: "none",
                fontSize: !shouldRequestManager ? "3rem" : "12px",
                minHeight: "50px",
                fontWeight: "medium",
                padding: "0 !important",
                color:
                  paymentType === "CASH" &&
                  !isLoading &&
                  inputAmount2 !== "" &&
                  !input2Error
                    ? "#00CA48"
                    : input2Error
                    ? "#FF3C14"
                    : "unset",
              },
              "& fieldset": { border: "none" },
            }}
          />
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center" }}
          onClick={handleMenu2Open}
        >
          <Typography
            sx={{
              fontSize: "25px",
              fontWeight: "500",
              marginLeft: "8px",
              cursor: "pointer",
              color: "rgba(140, 140, 141, 1)",
            }}
          >
            {selectedExchangeCurrency}
          </Typography>
          <ArrowForwardIosIcon
            sx={{ fontSize: "22px", color: "rgba(140, 140, 141, 1)" }}
          />
        </Box>
      </Box>

      <AnimatedTabs
        value={paymentType}
        onChange={handlePaymentChange}
        variant="fullWidth"
        TabIndicatorProps={{ children: <span /> }}
      >
        <AnimatedTab
          value="CASH"
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography sx={{ color: "inherit" }}>Наличными</Typography>
              <Box
                sx={{
                  padding: "2px 4px",
                  backgroundColor: "#00CA481A",
                  borderRadius: "4px",
                }}
              >
                <Typography
                  sx={{ fontSize: "11px", fontWeight: 600, color: "#00CA48" }}
                >
                  +1.6%
                </Typography>
              </Box>
            </Box>
          }
        />
        <AnimatedTab label="Переводом" value="CARD" />
      </AnimatedTabs>

      {/* Action button */}
      <Button
        sx={{ marginTop: ".5rem" }}
        disabled={!shouldRequestManager ? isDisabled : false}
        onClick={() => {
          if (shouldRequestManager) {
            Telegram.WebApp.openTelegramLink(
              `https://t.me/alfin_manager?text=Здравствуйте! Хочу обменять ${
                formatNumber(inputAmount1) + " " + selectedMainCurrency
              } на ${selectedExchangeCurrency} наличной оплатой.`
            );
            return;
          }
          navigate("/payment", {
            state: {
              selectedMainCurrency,
              selectedExchangeCurrency,
              inputAmount1,
              inputAmount2,
              exchangeRate,
              paymentType,
              buyAmountWithoutPercentage,
              discountPercentage,
            },
          });
        }}
      >
        {shouldRequestManager ? "Написать менеджеру" : "Обменять"}
      </Button>

      {/* Currency Selection Menu (First Input)*/}
      <Menu
        MenuListProps={{
          sx: {
            backgroundColor: "secondary.main",
            paddingBlock: "0 !important",
          },
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "16px",
              margin: "0",
            },
          },
        }}
        anchorEl={anchorEl1}
        open={Boolean(anchorEl1)}
        onClose={handleMenu1Close}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {allCurrenciesData?.map((currency, index) => (
          <Box key={currency.id}>
            <MenuItem
              onClick={() => {
                const newMainCurrency = currency.symbol;
                handleMenu1Close();

                // Обновляем валюту и пересчитываем значения
                handleCurrencyChange(
                  newMainCurrency,
                  selectedExchangeCurrency,
                  1
                );
              }}
              sx={{
                paddingBlock: "0",
                marginBlock: "0",
                minHeight: "40px",
              }}
            >
              <Box
                sx={{
                  width: "32px",
                  height: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                {currency.icon ? (
                  <Box
                    component="img"
                    src={currency.icon}
                    alt={`${currency.symbol} icon`}
                    style={{
                      width: "32px",
                      height: "16px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      fontSize: "10px",
                      fontWeight: "700",
                      color: "#555",
                      textTransform: "uppercase",
                    }}
                  >
                    {currency.symbol}
                  </Typography>
                )}
              </Box>
              <Typography sx={{ paddingLeft: "12px" }}>
                {currency.title}
              </Typography>
            </MenuItem>
            {index < allCurrenciesData.length - 1 && (
              <Divider
                sx={{
                  margin: "0 !important",
                  borderColor: `${theme.palette.mode === "dark" ? "#3C3C3F" : "#EFEFF3"}`,
                }}
              />
            )}
          </Box>
        ))}
      </Menu>

      <Menu
        MenuListProps={{
          sx: {
            backgroundColor: "secondary.main",
            paddingBlock: "0 !important",
          },
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "16px",
              margin: "0",
            },
          },
        }}
        anchorEl={anchorEl2}
        open={Boolean(anchorEl2)}
        onClose={handleMenu2Close}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {currenciesPairsData?.map((currency, index) => (
          <Box key={currency.id}>
            <MenuItem
              onClick={() => {
                const newExchangeCurrency = currency.symbol;
                handleMenu2Close();

                // Обновляем валюту и пересчитываем значения
                handleCurrencyChange(
                  selectedMainCurrency,
                  newExchangeCurrency,
                  2
                );
              }}
              sx={{
                paddingBlock: "0",
                marginBlock: "0",
                minHeight: "48px",
              }}
            >
              <Box
                sx={{
                  width: "32px",
                  height: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                {currency.icon ? (
                  <Box
                    component="img"
                    src={currency.icon}
                    alt={`${currency.symbol} icon`}
                    style={{
                      width: "32px",
                      height: "16px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      fontSize: "10px",
                      fontWeight: "700",
                      color: "#555",
                      textTransform: "uppercase",
                    }}
                  >
                    {currency.symbol}
                  </Typography>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  paddingLeft: "12px",
                }}
              >
                <Typography>{currency.title}</Typography>
                <Typography sx={{ paddingLeft: "15px" }}>
                  {currency.rate}
                </Typography>
              </Box>
            </MenuItem>
            {index < currenciesPairsData.length - 1 && (
              <Divider
                sx={{
                  margin: "0 !important",
                  borderColor: `${theme.palette.mode === "dark" ? "#3C3C3F" : "#EFEFF3"}`,
                }}
              />
            )}
          </Box>
        ))}
      </Menu>
    </Block>
  );
};
