import InputMask from "react-input-mask";
import { useState, MouseEvent, useEffect } from "react";
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
import { isPhoneComplete } from "../../utils";
import { SelectArrowsIcon } from "../../icons";
import { useMutation, useQueries, useQuery } from "react-query";
import { CreateOrder } from "../../services/orders/create";
import { CreateOrderRequestTypes } from "../../services/orders/interface";
import { getAllBankCards } from "../../services/bank-cards";
import { BankCard } from "../../services/bank-cards/interface";
import { useSnackbar } from "notistack";
import { fetchExchangeRate } from "../../services/exchange-rate";
import { useTelegram } from "../../hooks";

type FormData = {
  name: string;
  phone: string;
  paymentMethod: string;
  bankCardId: number;
  promocode: string;
  comment: string;
};

interface MenuComponentProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  items: string[] | BankCard[];
  onSelect: (item: string | BankCard) => void;
  menuType: "bank" | "card";
}

function MenuComponent({
  anchorEl,
  open,
  onClose,
  items,
  onSelect,
  menuType,
}: MenuComponentProps) {
  const navigate = useNavigate();
  const isDark = Telegram.WebApp.colorScheme === "dark";

  return (
    <Menu
      id={`${menuType}-menu`}
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
                borderColor: `${isDark ? "#31475E" : "#EFEFF3"}`,
              }}
            />
          )}
        </Box>
      ))}

      {menuType === "card" && (
        <Box>
          <Divider
            sx={{
              margin: "0 !important",
              borderColor: `${isDark ? "#31475E" : "#EFEFF3"}`,
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
      )}
    </Menu>
  );
}

const clearStorage = () => {
  localStorage.removeItem("paymentMethod");
  localStorage.removeItem("bankCardName");
  localStorage.removeItem("bankCardId");
  localStorage.removeItem("phoneNumber");
};

export function PaymentForm() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { tg } = useTelegram();
  useEffect(() => {
    tg.BackButton.show();
    tg.onEvent("backButtonClicked", () => {
      navigate(-1);
      clearStorage();
    });

    return () => {
      tg.BackButton.hide();
      tg.offEvent("backButtonClicked", () => {
        navigate(-1);
        clearStorage();
      });
    };
  }, [navigate, tg]);

  const [rate, setRate] = useState<number | undefined>();
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
  } = state || {};

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(
    localStorage.getItem("paymentMethod") || ""
  );
  const [selectedBankCard, setSelectedBankCard] = useState<string>(
    localStorage.getItem("bankCardName") || ""
  );
  const [menuType, setMenuType] = useState<"payment-method" | "cards">(
    "payment-method"
  );

  useEffect(() => {
    async function getRate() {
      const rate = await fetchExchangeRate({
        sellCurrency: selectedMainCurrency,
        buyCurrency: selectedExchangeCurrency,
      });
      setRate(rate.rate);
    }

    getRate();
  }, []);

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
      bankCardId: Number(localStorage.getItem("bankCardId")) || undefined,
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
      payment_method: data.paymentMethod === "Наличными" ? "CASH" : "CARD",
      status: "NEW",
      comment: data.comment,
      bank_card_id: data.bankCardId,
      phone_number: data.phone,
    };

    createOrderMutation(createOrderRequestData);
  };

  const handleMenuOpen = (
    event: MouseEvent<HTMLElement>,
    type: "payment-method" | "cards"
  ) => {
    setMenuType(type);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSelection = (item: string | BankCard) => {
    if (menuType === "payment-method" && typeof item === "string") {
      setSelectedPaymentMethod(item);
      localStorage.setItem("paymentMethod", item);
      setValue("paymentMethod", item);
    } else if (menuType === "cards" && typeof item !== "string") {
      setSelectedBankCard(item.account_name);
      localStorage.setItem("bankCardName", item.account_name);
      localStorage.setItem("bankCardId", JSON.stringify(item.id));
      setValue("bankCardId", item.id);
    }
    handleMenuClose();
  };

  // Check if all required fields are filled
  const isButtonDisabled = !(
    name &&
    isPhoneComplete(phone) &&
    selectedPaymentMethod &&
    selectedBankCard
  );

  return (
    <Fade in>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: "3rem", fontWeight: "500", textAlign: "center" }}
          >
            {inputAmount1 + " " + selectedMainCurrency}
          </Typography>
          <Typography sx={{ opacity: ".5", fontSize: "1rem" }}>
            = {inputAmount2 + " " + selectedExchangeCurrency} •{" "}
            {rate?.toFixed(2)}
          </Typography>
        </Box>

        <Block sx={{ marginTop: "1.25rem" }}>
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
              <Typography>Телефон</Typography>
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

            {/* Banks Menu Select */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginTop: "1rem",
              }}
            >
              <Typography>Способ оплаты</Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    cursor: "pointer",
                    color: "primary.main",
                    paddingRight: "3px",
                  }}
                  onClick={(e) => handleMenuOpen(e, "payment-method")}
                >
                  {selectedPaymentMethod || "Выберите метод оплаты"}
                </Typography>
                <SelectArrowsIcon />
              </Box>
              <MenuComponent
                anchorEl={anchorEl}
                open={menuType === "payment-method" && Boolean(anchorEl)}
                onClose={handleMenuClose}
                items={["Перевод", "Наличными"]}
                onSelect={handleSelection}
                menuType="bank"
              />
            </Box>
            <Divider sx={{ margin: "12px 0px" }} />

            {/* Bank Card Menu Select */}
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  marginTop: "1rem",
                }}
              >
                <Typography>Куда зачислить средства</Typography>
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
                  open={menuType === "cards" && Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  items={filteredCardsBySelectedCurrency || []}
                  onSelect={handleSelection}
                  menuType="card"
                />
              </Box>

              <Divider sx={{ margin: "12px 0px" }} />
            </>

            {/* Promocode Input */}
            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginTop: "1rem",
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
            </Box> */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginTop: "1rem",
              }}
            >
              <Typography>Коментарий</Typography>
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
