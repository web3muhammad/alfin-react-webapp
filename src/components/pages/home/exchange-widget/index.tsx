import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { SwapVertRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Block, Button } from "../../../shared";
import { formatNumber } from "../../../../utils";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useQuery } from "react-query";
import { getAllCurrencies } from "../../../../services/currencies";
import { getCurrenciesPairs } from "../../../../services/currencies/pairs";

import { debounce } from "lodash";
import { fetchExchangeRate } from "../../../../services/exchange-rate";

export const CurrencyExchangeWidget: React.FC = () => {
  const [inputAmount1, setInputAmount1] = useState("");
  const [inputAmount2, setInputAmount2] = useState("");
  const [anchorEl1, setAnchorEl1] = useState<null | HTMLElement>(null); // For the first menu
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null); // For the second menu
  const [selectedMainCurrency, setSelectedMainCurrency] = useState("RUB");
  const [selectedExchangeCurrency, setSelectedExchangeCurrency] =
    useState("TRY");
  const [exchangeRate, setExchangeRate] = useState(0);
  const [isRotated, setIsRotated] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const isDark = Telegram.WebApp.colorScheme === "dark";

  const debouncedFetchRate = useRef(
    debounce(
      async (
        sell: string,
        buy: string,
        setRate: React.Dispatch<React.SetStateAction<number>>
      ) => {
        const rate = await fetchExchangeRate(sell, buy);
        setRate(rate);
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
      setExchangeRate(defaultCurrency?.rate || 0);
    },
  });

  const isDisabledSwap = selectedExchangeCurrency === "SAR";

  const isDisabled =
    !inputAmount1 ||
    !inputAmount2 ||
    Number(inputAmount1) === 0 ||
    Number(inputAmount2) === 0 ||
    exchangeRate > Number(inputAmount1);

  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "inputAmount1" | "inputAmount2"
  ) => {
    let value = e.target.value.replace(/\D/g, ""); // Убираем нечисловые символы
    if (value.startsWith("0") && value.length > 1) value = value.substring(1); // Убираем ведущий ноль

    if (value.length <= 10) {
      const formattedValue = value === "0.00" ? "0" : formatNumber(value);
      if (field === "inputAmount1") {
        setInputAmount1(formattedValue);
        debouncedFetchRate(
          selectedMainCurrency,
          selectedExchangeCurrency,
          (rate) => {
            setExchangeRate(rate);

            // Пересчёт из основной валюты в обменную
            const convertedValue = (Number(value) * Number(rate)).toFixed(0);
            setInputAmount2(formatNumber(convertedValue));
          }
        );
      } else {
        setInputAmount2(formattedValue);
        debouncedFetchRate(
          selectedExchangeCurrency,
          selectedMainCurrency,
          (rate) => {
            setExchangeRate(rate);
            const convertedValue = (Number(value) * Number(rate)).toFixed(0);
            setInputAmount1(formatNumber(convertedValue));
          }
        );
      }
    }
  };

  const handleSwapClick = () => {
    setInputAmount1("");
    setInputAmount2("");

    setSelectedMainCurrency(selectedExchangeCurrency);
    setSelectedExchangeCurrency(selectedMainCurrency);

    setIsRotated((prev) => !prev);

    fetchExchangeRate(selectedMainCurrency, selectedExchangeCurrency).then(
      (rate) => {
        setExchangeRate(rate);
      }
    );
    if (inputRef.current) inputRef.current.focus();
  };
  // Handlers for the first menu
  const handleMenu1Open = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl1(e.currentTarget);
  };

  const handleMenu1Close = () => {
    setAnchorEl1(null);
  };

  // Handlers for the second menu
  const handleMenu2Open = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(e.currentTarget);
  };

  const handleMenu2Close = () => {
    setAnchorEl2(null);
  };

  const handleCurrencyChange = (
    newMainCurrency: string,
    newExchangeCurrency: string
  ) => {
    setSelectedMainCurrency(newMainCurrency);
    setSelectedExchangeCurrency(newExchangeCurrency);

    fetchExchangeRate(newMainCurrency, newExchangeCurrency).then((rate) => {
      setExchangeRate(rate);

      const mainAmount = Number(inputAmount1.replace(/\s/g, ""));
      const convertedValue = (mainAmount * rate).toFixed(0);
      setInputAmount2(formatNumber(convertedValue));
    });
  };

  useEffect(() => {
    return () => {
      debouncedFetchRate.cancel();
    };
  }, []);

  return (
    <Block
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "10px 16px",
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
            }}
            sx={{
              width: "100%",
              input: {
                border: "none",
                fontSize: "3rem",
                fontWeight: "medium",
                padding: "0",
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
            borderColor: `${isDark ? "#31475E" : "#EFEFF3"}`,
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
            border: `1px solid ${isDark ? "#31475E" : "#EFEFF3"}`,
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
                  currenciesPairsData?.find(
                    (currency) => currency.symbol === selectedExchangeCurrency
                  )?.icon
                }
                sx={{ width: "32px", height: "16px" }}
              />
            )}
          </Box>
          <TextField
            placeholder="0"
            type="tel"
            value={inputAmount2}
            onChange={(e) => handleAmountChange(e as any, "inputAmount2")}
            variant="outlined"
            slotProps={{
              htmlInput: {
                maxLength: 10,
                readOnly: isDisabledSwap,
              },
            }}
            sx={{
              width: "100%",
              input: {
                border: "none",
                fontSize: "3rem",
                fontWeight: "medium",
                padding: "0",
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

      {/* Action button */}
      <Button
        sx={{ marginTop: ".5rem" }}
        disabled={isDisabled}
        onClick={() => {
          navigate("/payment", {
            state: {
              selectedMainCurrency,
              selectedExchangeCurrency,
              inputAmount1,
              inputAmount2,
              exchangeRate,
            },
          });
        }}
      >
        Обменять
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
                handleCurrencyChange(newMainCurrency, selectedExchangeCurrency);
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
                  borderColor: "#EFEFF3",
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
                handleCurrencyChange(selectedMainCurrency, newExchangeCurrency);
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
                  {currency.rate}₽
                </Typography>
              </Box>
            </MenuItem>
            {index < currenciesPairsData.length - 1 && (
              <Divider
                sx={{
                  margin: "0 !important",
                  borderColor: "#EFEFF3",
                }}
              />
            )}
          </Box>
        ))}
      </Menu>
    </Block>
  );
};
