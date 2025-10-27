import InputMask from "react-input-mask";
import { useState, MouseEvent, useEffect, useCallback } from "react";
import {
  Box,
  TextField,
  Typography,
  Divider,
  MenuItem,
  Menu,
  Fade,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Block, Button } from "../../components/shared";
import { formatNumber, isPhoneComplete } from "../../utils";
import { SelectArrowsIcon } from "../../icons";
import { useMutation, useQueries, useQuery } from "react-query";
import { CreateOrder } from "../../services/orders/create";
import { CreateOrderRequestTypes } from "../../services/orders/interface";
import { getAllBankCards } from "../../services/bank-cards";
import { BankCard } from "../../services/bank-cards/interface";
import { useSnackbar } from "notistack";
import { fetchExchangeRate } from "../../services/exchange-rate";
import { useTelegram } from "../../hooks";
import { ScheduleInfoBlock } from "../../components/shared/ScheduleInfoBlock";
import { getCashCities } from "../../services/orders/cash-cities";

type FormData = {
  name: string;
  phone: string;
  paymentMethod: string;
  accountId: number | string;
  promocode: string;
  comment: string;
};

interface MenuComponentProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  items: string[] | BankCard[];
  onSelect: (item: string | BankCard) => void;
}

function MenuComponent({
  anchorEl,
  open,
  onClose,
  items,
  onSelect,
}: MenuComponentProps) {
  const navigate = useNavigate();
  const isDark = Telegram.WebApp.colorScheme === "dark";

  return (
    <Menu
      id={`cards-menu`}
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{
        sx: { backgroundColor: "secondary.main", paddingBlock: "0 !important" },
      }}
      slotProps={{
        paper: { sx: { borderRadius: "16px", margin: "0" } },
      }}
      anchorOrigin={{ vertical: "center", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
    >
      {items.map((item, index) => (
        <Box key={index}>
          {typeof item === "string" ? (
            <MenuItem
              sx={{ paddingBlock: "0", marginBlock: "0" }}
              onClick={() => onSelect(item)}
            >
              <Typography>{item}</Typography>
            </MenuItem>
          ) : (
            <MenuItem
              sx={{ paddingBlock: "0", marginBlock: "0" }}
              onClick={() => onSelect(item)}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Typography>{item.account_name}</Typography>
                <Typography
                  sx={{ fontSize: "12px", color: "rgba(140, 140, 141, 1)" }}
                >
                  {item.card_number
                    ? item.card_number.toString().slice(-4)
                    : item.trc_20
                    ? item.trc_20.toString().slice(0, 4)
                    : item.iban
                    ? item.iban.toString().slice(0, 4)
                    : "0000"}
                </Typography>
              </Box>
            </MenuItem>
          )}

          {index < items.length - 1 && (
            <Divider
              sx={{
                margin: "0 !important",
                borderColor: `${isDark ? "#3C3C3F" : "#EFEFF3"}`,
              }}
            />
          )}
        </Box>
      ))}

      <Box>
        <Divider
          sx={{
            margin: "0 !important",
            borderColor: `${isDark ? "#3C3C3F" : "#EFEFF3"}`,
          }}
        />
        <MenuItem
          sx={{ paddingBlock: "0", marginBlock: "0" }}
          onClick={() =>
            navigate("/add-card", {
              state: { formType: "create", fromPage: "payment" },
            })
          }
        >
          <Typography>Добавить реквизиты</Typography>
        </MenuItem>
      </Box>
    </Menu>
  );
}

const clearStorage = () => {
  localStorage.removeItem("paymentMethod");
  localStorage.removeItem("bankCardName");
  localStorage.removeItem("accountId");
  localStorage.removeItem("phoneNumber");
};

export function PaymentForm() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { tg } = useTelegram();

  const handleBackButton = useCallback(() => {
    navigate(-1);
    clearStorage();
  }, [navigate]);

  useEffect(() => {
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", handleBackButton);

    return () => {
      tg.offEvent("backButtonClicked", handleBackButton);
      tg.BackButton.hide();
    };
  }, [tg, handleBackButton]);

  const { state } = useLocation();
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const userPhone = userInfo.phone_number;
  const userName = userInfo.first_name + " " + userInfo.last_name;
  const {
    inputAmount1,
    inputAmount2,
    selectedMainCurrency,
    selectedExchangeCurrency,
    exchangeRate,
    paymentType,
    receiveMethod,
  } = state || {};

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElCity, setAnchorElCity] = useState<null | HTMLElement>(null);
  const [selectedBankCard, setSelectedBankCard] = useState<string>(
    localStorage.getItem("bankCardName") || ""
  );
  const [selectedCity, setSelectedCity] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      name: userName || "",
      phone: localStorage.getItem("phoneNumber") || userPhone || "",
      paymentMethod: localStorage.getItem("paymentMethod") || "",
      accountId: Number(localStorage.getItem("accountId")) || undefined,
      promocode: "",
      comment: "",
    },
  });

  const { mutate: createOrderMutation, isLoading } = useMutation({
    mutationFn: CreateOrder,
    mutationKey: ["create-order"],
    onSuccess() {
      clearStorage();
      navigate("/");
      enqueueSnackbar(
        "Заявка создана успешно, менеджер сейчас с вами свяжется",
        {
          variant: "success",
        }
      );
    },
  });

  const { data: allBankCards } = useQuery({
    queryFn: getAllBankCards,
    queryKey: ["all-cards"],
  });

  const { data: cashCitiesData, isLoading: isLoadingCities } = useQuery({
    queryFn: () => getCashCities(selectedExchangeCurrency),
    queryKey: ["cash-cities", selectedExchangeCurrency],
    enabled: !!selectedExchangeCurrency && receiveMethod === "CASH",
  });

  const availableCities = cashCitiesData?.cities || [];

  const filteredCardsBySelectedCurrency = allBankCards?.filter(
    (bankCard) => bankCard.currency === selectedExchangeCurrency
  );

  const name = watch("name");
  const phone = watch("phone");

  const onSubmit = (data: FormData) => {
    const createOrderRequestData: CreateOrderRequestTypes = {
      sell_currency: selectedMainCurrency,
      buy_currency: selectedExchangeCurrency,
      sell_amount: parseFloat(inputAmount1.replace(/\s/g, "")),
      buy_amount: parseFloat(inputAmount2.replace(/\s/g, "")),
      rate: exchangeRate,
      payment_method: state.paymentType,
      receive_method: receiveMethod === "CASH" ? "CASH" : "TRANSFER",
      receive_city: receiveMethod === "CASH" ? selectedCity : undefined,
      status: "NEW",
      comment: data.comment,
      account_id: receiveMethod === "CARD" ? data.accountId : null,
      phone_number: data.phone,
      buy_amount_without_discount: state.buyAmountWithoutPercentage,
      discount_percentage: state.discountPercentage,
      order_type: "EXCHANGE",
    };

    createOrderMutation(createOrderRequestData);
  };

  const handleMenuOpen = (
    event: MouseEvent<HTMLElement>,
    type: "payment-method" | "cards"
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSelection = (item: string | BankCard) => {
    if (typeof item !== "string") {
      setSelectedBankCard(item.account_name);
      localStorage.setItem("bankCardName", item.account_name);
      localStorage.setItem("accountId", JSON.stringify(item.id));
      setValue("accountId", item.id);
    }
    handleMenuClose();
  };

  const handleCityMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorElCity(event.currentTarget);
  };

  const handleCityMenuClose = () => {
    setAnchorElCity(null);
  };

  const handleCitySelection = (city: string) => {
    setSelectedCity(city);
    handleCityMenuClose();
  };

  const isButtonDisabled = !(
    name &&
    isPhoneComplete(phone) &&
    (receiveMethod === "CARD" 
      ? selectedBankCard 
      : selectedCity && !isLoadingCities)
  );

  return (
    <Fade in>
      <Box sx={{ width: "100%", marginBottom: "100px" }}>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              opacity: ".5",
              textAlign: "center",
            }}
          >
            {inputAmount1 + " " + selectedMainCurrency + " ="}
          </Typography>
          <Typography
            sx={{ fontSize: "3rem", lineHeight: "1.15", fontWeight: "500" }}
          >
            {inputAmount2 + " " + selectedExchangeCurrency}
          </Typography>
          {state.discountPercentage && (
            <Box
              sx={{
                fontSize: "16px",
                fontWeight: 400,
                display: "flex",
                gap: "4px",
                mt: 0.5,
              }}
            >
              <Typography
                sx={{
                  textDecoration: "line-through",
                  opacity: ".5",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                }}
              >
                {formatNumber(String(state.buyAmountWithoutPercentage))}
              </Typography>

              <Typography
                sx={{
                  opacity: ".5",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                }}
              >
                {selectedExchangeCurrency}
              </Typography>
              <Box
                sx={{
                  padding: "2px 6px",
                  backgroundColor: "#00CA481A",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  ml: ".5",
                }}
              >
                <Typography
                  sx={{ color: "#00CA48", fontWeight: "500", fontSize: "12px" }}
                >{`Ваш бонус ${state.discountPercentage}%`}</Typography>
              </Box>
            </Box>
          )}
        </Box>

        <Box sx={{ marginTop: "2rem" }}>
          <ScheduleInfoBlock />
        </Box>

        {/* Блок 1: Данные, которые пользователь отправляет */}
        <Block sx={{ marginTop: ".75rem" }}>
          <Box component="form">
            {/* Name Input */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Typography>Ваше имя</Typography>
              <TextField
                sx={{
                  width: "60%",
                  input: {
                    paddingBlock: "2px",
                    paddingLeft: "10px",
                    textAlign: "right",
                    cursor: "default",
                  },
                  "& fieldset": { border: "none" },
                }}
                {...register("name", { required: "Обязятельно для ввода" })}
                error={!!errors.name}
                slotProps={{
                  htmlInput: {
                    readOnly: true,
                  },
                }}
                fullWidth
              />
            </Box>
            <Divider sx={{ margin: "12px 0px" }} />

            {/* Phone Number Input */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Typography>Номер телефона</Typography>
              <InputMask
                mask="+7 (999) 999-99-99"
                value={localStorage.getItem("phoneNumber") || phone}
                onChange={(e) => {
                  setValue("phone", e.target.value);
                  localStorage.setItem("phoneNumber", e.target.value);
                }}
              >
                <TextField
                  placeholder="+7 900 000-00-00"
                  type="tel"
                  sx={{
                    width: "60%",
                    input: {
                      paddingBlock: "2px",
                      paddingLeft: "10px",
                      textAlign: "right",
                    },
                    "& fieldset": { border: "none" },
                  }}
                  error={!!errors.phone}
                  fullWidth
                />
              </InputMask>
            </Box>
            <Divider sx={{ margin: "12px 0px" }} />

            {/* Payment Method */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Typography>Способ оплаты</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Typography>
                  {paymentType === "CASH" ? "Наличные" : "Перевод"}
                </Typography>
                {paymentType === "CASH" && (
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
                      +1.5%
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Block>

        {/* Блок 2: Данные получения */}
        <Block sx={{ marginTop: ".75rem" }}>
          <Box component="form">
            {/* Receive Method */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Typography>Способ получения</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Typography>
                  {receiveMethod === "CASH" ? "Наличные" : "Перевод"}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ margin: "12px 0px" }} />

            {/* Bank Card Menu Select or City Select */}
            {receiveMethod === "CARD" ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography>Счет зачисления</Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{
                      cursor: "pointer",
                      color: "primary.main",
                      paddingRight: "3px",
                    }}
                    onClick={(e) => {
                      if (filteredCardsBySelectedCurrency?.length === 0) {
                        navigate("/add-card", {
                          state: { formType: "create", fromPage: "payment" },
                        });
                      }
                      handleMenuOpen(e, "cards");
                    }}
                  >
                    {filteredCardsBySelectedCurrency?.length === 0
                      ? "Добавить"
                      : selectedBankCard || "Выберите карту"}
                  </Typography>
                  {filteredCardsBySelectedCurrency?.length !== 0 && (
                    <SelectArrowsIcon />
                  )}
                </Box>
                <MenuComponent
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  items={filteredCardsBySelectedCurrency || []}
                  onSelect={handleSelection}
                />
              </Box>
              </>
            ) : (
              /* City Select for Cash Receive */
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <Typography>Город получения</Typography>
                {isLoadingCities ? (
                  <Typography sx={{ color: "text.secondary" }}>...</Typography>
                ) : availableCities.length > 0 ? (
                  <>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        sx={{
                          cursor: "pointer",
                          color: "primary.main",
                          paddingRight: "3px",
                        }}
                        onClick={handleCityMenuOpen}
                      >
                        {selectedCity || "Выберите город"}
                      </Typography>
                      <SelectArrowsIcon />
                    </Box>
                    <Menu
                      id="city-menu"
                      anchorEl={anchorElCity}
                      open={Boolean(anchorElCity)}
                      onClose={handleCityMenuClose}
                      MenuListProps={{
                        sx: {
                          backgroundColor: "secondary.main",
                          paddingBlock: "0 !important",
                        },
                      }}
                      slotProps={{
                        paper: { sx: { borderRadius: "16px", margin: "0" } },
                      }}
                      anchorOrigin={{ vertical: "center", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "left" }}
                    >
                      {availableCities.map((city: string, index: number) => (
                        <Box key={index}>
                          <MenuItem
                            sx={{ paddingBlock: "0", marginBlock: "0" }}
                            onClick={() => handleCitySelection(city)}
                          >
                            <Typography>{city}</Typography>
                          </MenuItem>
                          {index < availableCities.length - 1 && (
                            <Divider
                              sx={{
                                margin: "0 !important",
                                borderColor: `${
                                  Telegram.WebApp.colorScheme === "dark"
                                    ? "#3C3C3F"
                                    : "#EFEFF3"
                                }`,
                              }}
                            />
                          )}
                        </Box>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <Typography
                    sx={{
                      color: "primary.main",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      Telegram.WebApp.openTelegramLink(
                        "https://t.me/alfin_manager"
                      );
                    }}
                  >
                    Свяжитесь с менеджером
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </Block>

        {/* Блок 3: Дополнительные поля перед отправкой заявки */}
        <Block sx={{ marginTop: ".75rem" }}>
          <Box component="form">
            {/* Promocode Input */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Typography>Промокод</Typography>
              <TextField
                placeholder="Если есть"
                sx={{
                  width: "60%",
                  input: {
                    paddingBlock: "2px",
                    paddingLeft: "10px",
                    textAlign: "right",
                  },
                  "& fieldset": { border: "none" },
                }}
                {...register("promocode")}
                error={!!errors.promocode}
                fullWidth
              />
            </Box>
            <Divider sx={{ margin: "12px 0px" }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Typography>Комментарий</Typography>
              <TextField
                placeholder="Если есть"
                sx={{
                  width: "60%",
                  input: {
                    paddingBlock: "2px",
                    paddingLeft: "10px",
                    textAlign: "right",
                  },
                  "& fieldset": { border: "none" },
                }}
                {...register("comment")}
                error={!!errors.comment}
                fullWidth
              />
            </Box>
          </Box>
        </Block>
        <Button
          onClick={handleSubmit(onSubmit)}
          sx={{ marginTop: "1.5rem" }}
          type="submit"
          disabled={isButtonDisabled}
        >
          {isLoading ? (
            <CircularProgress size={25} sx={{ color: "#fff" }} />
          ) : (
            "Отправить заявку"
          )}
        </Button>
      </Box>
    </Fade>
  );
}
