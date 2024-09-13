import React, { useMemo, useReducer } from "react";
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
import { Button } from "../../shared/Button";
import { SwapVertRounded, UnfoldMore } from "@mui/icons-material";
import { Action, State } from "./types";
import { useTelegramTheme } from "../../../hooks";

// Define the initial state
const initialState = {
  amount: 15000,
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
  const isDark = Telegram.WebApp.colorScheme === "dark";
  const theme = useTelegramTheme();

  // Memoized calculation of the amount based on buying/selling
  const calculatedAmount = useMemo(() => {
    const amountString = String(state.amount).replace(/\s/g, ""); 
    const amount = Number(amountString); 
    return state.isBuying
      ? (amount * state.exchangeRate).toFixed(0) 
      : (amount / state.exchangeRate).toFixed(0); 
  }, [state.amount, state.exchangeRate, state.isBuying]);

  // Handle input change with digit limit
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "");
    if (input.length <= 10) {
      dispatch({ type: "SET_AMOUNT", payload: input });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "secondary.main",
        padding: "16px",
        borderRadius: "16px",
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      {state.isBuying ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ paddingRight: "4px" }}>Вы получите</Typography>

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
          <svg
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1_1508)">
              <path
                d="M2.5 8.25L6 11.25L9.5 8.25"
                stroke={theme.palette.primary.main}
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.5 4.75L6 1.75L9.5 4.75"
                stroke={theme.palette.primary.main}
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_1508">
                <rect
                  width="12"
                  height="12"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </Box>
      ) : (
        <Typography>Вы платите</Typography>
      )}

      {/* Input section */}
      <Box sx={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
        <Box sx={{ position: "relative", flex: 1 }}>
          <TextField
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
          }}
          onClick={() => dispatch({ type: "TOGGLE_BUY_SELL" })}
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
            : `Вы получите ${calculatedAmount}`}
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

            <svg
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1_1508)">
                <path
                  d="M2.5 8.25L6 11.25L9.5 8.25"
                  stroke={theme.palette.primary.main}
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.5 4.75L6 1.75L9.5 4.75"
                  stroke={theme.palette.primary.main}
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_1508">
                  <rect
                    width="12"
                    height="12"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </Box>
        )}
      </Box>

      {/* Action button */}
      <Button sx={{ marginTop: "16px" }}>
        {!state.isBuying
          ? `Купить ${calculatedAmount} ${state.selectedCurrency} за ${state.amount} RUB`
          : `Продать ${state.amount || 0} ${
              state.selectedCurrency
            } за ${calculatedAmount} RUB`}
      </Button>

      {/* Currency Selection Menu */}
      <Menu
        MenuListProps={{
          sx: {
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
          <React.Fragment key={currency.code}>
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
          </React.Fragment>
        ))}
      </Menu>
    </Box>
  );
};
