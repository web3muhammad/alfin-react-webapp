import InputMask from "react-input-mask";
import { useState, MouseEvent } from "react";
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
import { Block, Button, Title } from "../../../components/shared";
import { SelectArrowsIcon } from "../../../icons";
import { useMutation, useQuery } from "react-query";
import { createBankCard } from "../../../services/bank-cards/create";
import { getAllCurrencies } from "../../../services/currencies";
import { editBankCard } from "../../../services/bank-cards/edit";
import { deleteBankCard } from "../../../services/bank-cards/delete";
import { useSnackbar } from "notistack";
import { useTelegramBackButton } from "../../../hooks/useTelegramBackButton";

type AddCardFormData = {
  cardName: string;
  ownerName: string;
  cardCurrency: string;
  cardNumber: string;
};

const isCompleteCardNumber = (cardNumber: string): boolean => {
  const strippedPhone = cardNumber?.replace(/[^0-9]/g, "");
  return strippedPhone?.length === 16;
};

export function AddCardForm() {
  const { enqueueSnackbar } = useSnackbar();
  const { state } = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCurrencyMenu, setSelectedCurrencyMenu] = useState<string>(
    state.currency || ""
  );
  const navigate = useNavigate();
  useTelegramBackButton(() => {
    if (state.fromPage === "payment") {
      navigate(-1);
    } else {
      navigate("/bank-cards");
    }
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<AddCardFormData>({
    mode: "onChange", // Enables form validation to trigger on each change
    defaultValues: {
      cardName: state.bankName || "",
      ownerName: state.ownerName || "",
      cardCurrency: state.currency || "",
      cardNumber: String(state.cardNumber) || "",
    },
  });

  const { data: allCurrencyData } = useQuery({
    queryFn: getAllCurrencies,
    queryKey: ["all-currency"],
  });

  const { mutate: createBankCardMutation, isLoading: createCardLoading } =
    useMutation({
      mutationFn: createBankCard,
      mutationKey: ["create-card"],
      onSuccess() {
        enqueueSnackbar("Банковская карта была успешно добавлена", {
          variant: "success",
        });
        if (state.fromPage === "payment") {
          navigate(-1);
        } else {
          navigate("/bank-cards");
        }
      },
    });

  const { mutate: editBankCardMutation, isLoading: editCardLoading } =
    useMutation({
      mutationFn: editBankCard,
      mutationKey: ["edit-card"],
      onSuccess() {
        navigate("/bank-cards");
        enqueueSnackbar("Данные банковской карты успешно изменены", {
          variant: "success",
        });
      },
    });

  const { mutate: deleteBankCardMutation, isLoading: deleteCardLoading } =
    useMutation({
      mutationFn: deleteBankCard,
      mutationKey: ["delete-card"],
      onSuccess() {
        navigate("/bank-cards");
        enqueueSnackbar("Банковская карта успешно удалена", {
          variant: "success",
        });
      },
    });

  const onSubmit = (data: AddCardFormData) => {
    const { cardName, cardNumber, cardCurrency, ownerName } = data;

    const submitData = {
      bank_name: cardName,
      owner_name: ownerName,
      card_number: Number(cardNumber.replace(/\s/g, "")),
      currency: cardCurrency,
    };

    if (state.formType === "create") {
      createBankCardMutation(submitData);
    }

    if (state.formType === "edit") {
      editBankCardMutation({ ...submitData, cardId: state.cardId });
    }
  };

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSelection = (item: string) => {
    setSelectedCurrencyMenu(item);
    setValue("cardCurrency", item, { shouldValidate: true });
    handleMenuClose();
  };

  const isDisabled = !isValid && !isCompleteCardNumber(watch("cardNumber"));

  return (
    <Fade in>
      <Box sx={{ width: "100%" }}>
        <Title>Новая карта</Title>
        <Block sx={{ marginTop: "1.25rem" }}>
          <Box component="form">
            {/* Card Name Input */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Typography>Название карты</Typography>
              <TextField
                placeholder="Магомед Турецкая"
                sx={{
                  width: "60%",
                  input: {
                    paddingRight: "0px",
                    paddingBlock: "2px",
                    paddingLeft: "10px",
                    textAlign: "right",
                  },
                  "& fieldset": { border: "none" },
                }}
                {...register("cardName", { required: true })}
                error={!!errors.cardName}
                fullWidth
              />
            </Box>
            <Divider sx={{ margin: "12px 0px" }} />

            {/* Card Currency Menu */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginTop: "1rem",
              }}
            >
              <Typography>Валюта</Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    cursor: "pointer",
                    color: "primary.main",
                    paddingRight: "3px",
                  }}
                  onClick={handleMenuOpen}
                >
                  {selectedCurrencyMenu || "Выберите валюту"}
                </Typography>
                <SelectArrowsIcon />
              </Box>
              <Menu
                id="currency-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
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
                {allCurrencyData?.map((item, index) => (
                  <Box key={index}>
                    <MenuItem
                      sx={{
                        paddingBlock: "0",
                        marginBlock: "0",
                        minHeight: "40px",
                        minWidth: "100px",
                      }}
                      onClick={() => handleSelection(item.symbol)}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px",
                        }}
                      >
                        <Box
                          component="img"
                          src={item.icon}
                          sx={{ width: "32px", height: "16px" }}
                        />
                        <Typography>{item.symbol}</Typography>
                      </Box>
                    </MenuItem>
                    {index < allCurrencyData.length - 1 && (
                      <Divider
                        sx={{
                          margin: "0 !important",
                          borderColor: `${
                            Telegram.WebApp.colorScheme === "dark"
                              ? "#31475E"
                              : "#EFEFF3"
                          }`,
                        }}
                      />
                    )}
                  </Box>
                ))}
              </Menu>
            </Box>
            <Divider sx={{ margin: "12px 0px" }} />

            {/* Owner Name Input */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Typography>Имя на карте</Typography>
              <TextField
                placeholder="MAGOMED MAGOMEDOV"
                sx={{
                  width: "60%",
                  input: {
                    paddingRight: "0px",
                    paddingBlock: "2px",
                    paddingLeft: "10px",
                    textAlign: "right",
                  },
                  "& fieldset": { border: "none", padding: "0" },
                }}
                {...register("ownerName", {
                  required: true,
                  pattern: /^[a-zA-Z\s]+$/,
                })}
                error={!!errors.ownerName}
                fullWidth
                onChange={(e) => {
                  const value = e.target.value;
                  const latinOnly = value.replace(/[^a-zA-Z\s]/g, "");
                  if (value !== latinOnly) {
                    enqueueSnackbar("Ввод только латиницей.", {
                      variant: "warning",
                    });
                  }
                  e.target.value = latinOnly.toUpperCase();
                }}
              />
            </Box>
            <Divider sx={{ margin: "12px 0px" }} />

            {/* Card Number Input */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Typography>Номер карты</Typography>
              <InputMask
                placeholder="0000 0000 0000 0000"
                mask="9999 9999 9999 9999"
                value={watch("cardNumber")}
                onChange={(e) =>
                  setValue("cardNumber", e.target.value, {
                    shouldValidate: true,
                  })
                }
              >
                <TextField
                  sx={{
                    width: "60%",
                    input: {
                      paddingBlock: "2px",
                      paddingLeft: "10px",
                      textAlign: "right",
                    },
                    "& fieldset": { border: "none" },
                  }}
                  error={!!errors.cardNumber}
                  fullWidth
                />
              </InputMask>
            </Box>
          </Box>
        </Block>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit(onSubmit)}
          sx={{ marginTop: "1.5rem" }}
          type="submit"
          disabled={isDisabled} // Disables button when form is invalid
        >
          {createCardLoading || editCardLoading ? (
            <CircularProgress sx={{ color: "#fff" }} size={25} />
          ) : (
            "Сохранить"
          )}
        </Button>

        {/* Delete Card Button */}
        {state.formType === "edit" && (
          <Button
            sx={{
              marginTop: ".75rem",
              backgroundColor:
                Telegram.WebApp.colorScheme === "dark"
                  ? "rgba(44, 44, 46, 1)"
                  : "#fff",
              color: "error.light",
            }}
            onClick={() => deleteBankCardMutation(state.cardId)}
          >
            {deleteCardLoading ? (
              <CircularProgress size={25} />
            ) : (
              "Удалить карту"
            )}
          </Button>
        )}
      </Box>
    </Fade>
  );
}
