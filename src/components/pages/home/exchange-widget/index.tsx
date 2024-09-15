import React, { useMemo, useReducer, useRef, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { currencies } from "./data";
import { SwapVertRounded } from "@mui/icons-material";
import { Action, State } from "./types";
import { useNavigate } from "react-router-dom";
import { useTelegramTheme } from "../../../../hooks";
import { Block, Button } from "../../../shared";
import { formatNumber } from "../../../../utils";
import { SelectArrowsIcon } from "../../../../icons";

// Define the initial state
const initialState = {
  amount: "15 000",
  selectedCurrency: "TRY",
  exchangeRate: 2.89,
  isBuying: false,
  anchorEl: null,
};

// Reducer function
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_AMOUNT":
      return { ...state, amount: action.payload };
    case "SET_CURRENCY":
      return {
        ...state,
        selectedCurrency: action.payload.currency,
        exchangeRate: action.payload.rate,
        anchorEl: null,
      };
    case "TOGGLE_BUY_SELL":
      return { ...state, isBuying: !state.isBuying };
    case "OPEN_MENU":
      return { ...state, anchorEl: action.payload };
    case "CLOSE_MENU":
      return { ...state, anchorEl: null };
    default:
      return state;
  }
}

export const CurrencyExchangeWidget: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isRotated, setIsRotated] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const isDark = Telegram.WebApp.colorScheme === "dark";

  // Memoized calculation of the amount based on buying/selling
  const calculatedAmount = useMemo(() => {
    const amountString = String(state.amount).replace(/\s/g, "");
    const amount = Number(amountString);
    return state.isBuying
      ? (amount * state.exchangeRate).toFixed(0)
      : (amount / state.exchangeRate).toFixed(0);
  }, [state.amount, state.exchangeRate, state.isBuying]);

  const isDisabled =
    state.amount === ("" || "0") ||
    calculatedAmount === "0" ||
    (!state.isBuying && state.exchangeRate > Number(state.amount));

  // Handle input change with digit limit and formatting
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");

    // Prevent typing a leading zero (unless it's just "0")
    if (input.length > 1 && input.startsWith("0")) {
      input = input.substring(1);
    }

    if (input.length <= 10) {
      const formattedInput = formatNumber(input);
      dispatch({ type: "SET_AMOUNT", payload: formattedInput });
    }
  };

  const handleSwapClick = () => {
    dispatch({ type: "SET_AMOUNT", payload: "" });
    dispatch({ type: "TOGGLE_BUY_SELL" });
    setIsRotated(!isRotated);

    // Focus the input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Block
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {state.isBuying ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ paddingRight: "4px" }}>Вы продаете</Typography>
          <Typography
            sx={{
              cursor: "pointer",
              color: "primary.main",
              paddingRight: "3px",
            }}
            onClick={(e) =>
              dispatch({ type: "OPEN_MENU", payload: e.currentTarget })
            } // Open the Menu
          >
            {state.selectedCurrency} • {state.exchangeRate}₽
          </Typography>
          <SelectArrowsIcon />
        </Box>
      ) : (
        <Typography>Вы платите</Typography>
      )}

      {/* Input section */}
      <Box sx={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
        <Box sx={{ position: "relative", flex: 1 }}>
          <TextField
            inputRef={inputRef}
            placeholder="0"
            type="tel"
            value={state.amount}
            onChange={handleAmountChange}
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
        <Typography
          sx={{ fontSize: "20px", fontWeight: "bold", marginLeft: "8px" }}
        >
          {state.isBuying ? state.selectedCurrency : "RUB"}
        </Typography>
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

      {/* Conversion details */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          paddingTop: ".5rem",
        }}
      >
        <Typography>
          {state.isBuying
            ? `Вы платите ${state.amount} ${state.selectedCurrency}`
            : `Вы получите ${formatNumber(calculatedAmount)}`}
        </Typography>

        {!state.isBuying && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
            }}
            onClick={(e) =>
              dispatch({ type: "OPEN_MENU", payload: e.currentTarget })
            }
          >
            <Typography
              sx={{
                cursor: "pointer",
                color: "primary.main",
              }}
            >
              {state.selectedCurrency} • {state.exchangeRate}₽
            </Typography>

            <SelectArrowsIcon />
          </Box>
        )}
      </Box>

      {/* Action button */}
      <Button
        disabled={isDisabled}
        onClick={() => {
          navigate("/payment", {
            state: {
              amount: state.amount,
              selectedCurrency: state.selectedCurrency,
              calculatedAmount: calculatedAmount,
              isBuying: state.isBuying,
            },
          });
        }}
        sx={{ marginTop: "16px" }}
      >
        {isDisabled
          ? !state.isBuying
            ? "Купить"
            : "Продать"
          : !state.isBuying
          ? `Купить ${formatNumber(calculatedAmount)} ${
              state.selectedCurrency
            } за ${state.amount || 0} RUB`
          : `Продать ${state.amount || 0} ${
              state.selectedCurrency
            } за ${formatNumber(calculatedAmount)} RUB`}
      </Button>

      {/* Currency Selection Menu */}
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
        anchorEl={state.anchorEl}
        open={Boolean(state.anchorEl)}
        onClose={() => dispatch({ type: "CLOSE_MENU" })}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {currencies.map((currency, index) => (
          <Box key={currency.code}>
            <MenuItem
              sx={{
                paddingBlock: "0",
                marginBlock: "0",
              }}
              onClick={() =>
                dispatch({
                  type: "SET_CURRENCY",
                  payload: { currency: currency.code, rate: currency.rate },
                })
              }
            >
              <ListItemIcon>
                <Box
                  sx={{
                    width: "32px",
                    background: currency.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    borderRadius: "4px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "10px",
                      fontWeight: "700",
                      color: "#fff",
                      textTransform: "uppercase",
                    }}
                  >
                    {currency.code}
                  </Typography>
                </Box>
                <Typography sx={{ paddingLeft: "12px" }}>
                  {currency.name} - {currency.rate}₽
                </Typography>
              </ListItemIcon>
            </MenuItem>
            {index < currencies.length - 1 && (
              <Divider
                sx={{
                  margin: "0 !important",
                  borderColor: `${isDark ? "#31475E" : "#EFEFF3"}`,
                }}
              />
            )}
          </Box>
        ))}
      </Menu>
    </Block>
  );
};
