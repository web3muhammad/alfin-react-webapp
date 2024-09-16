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
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useTelegram } from "../../../hooks";
import { Block, Button, Title } from "../../../components/shared";
import { SelectArrowsIcon } from "../../../icons";

type AddCardFormData = {
  cardName: string;
  ownerName: string;
  cardCurrency: string;
  cardNumber: string;
};

const currencies = ["TRY", "AED", "SAR", "USFD", "RUB"];

export function AddCardForm() {
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCurrencyMenu, setSelectedCurrencyMenu] = useState<string>("");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<AddCardFormData>({
    mode: "onChange", // Enables form validation to trigger on each change
    defaultValues: {
      cardName: "",
      ownerName: "",
      cardCurrency: "",
      cardNumber: "",
    },
  });

  const onSubmit = (data: AddCardFormData) => {
    console.log(data);
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

  return (
    <Fade in>
      <Box>
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
                {currencies.map((item, index) => (
                  <Box key={index}>
                    <MenuItem
                      sx={{
                        paddingBlock: "0",
                        marginBlock: "0",
                        minHeight: "35px", // Setting minimum height
                        minWidth: "80px", // Setting minimum width
                      }}
                      onClick={() => handleSelection(item)}
                    >
                      {item}
                    </MenuItem>
                    {index < currencies.length - 1 && (
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
                placeholder="Магомед Магомедов"
                sx={{
                  width: "60%",
                  input: {
                    paddingBlock: "2px",
                    paddingLeft: "10px",
                    textAlign: "right",
                  },
                  "& fieldset": { border: "none" },
                }}
                {...register("ownerName", { required: true })}
                error={!!errors.ownerName}
                fullWidth
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
          disabled={!isValid} // Disables button when form is invalid
        >
          Отправить заявку
        </Button>

        {/* Delete Card Button */}
        <Button
          sx={{
            marginTop: ".75rem",
            backgroundColor:
              Telegram.WebApp.colorScheme === "dark"
                ? "rgba(44, 44, 46, 1)"
                : "#fff",
            color: "error.light",
          }}
          onClick={() => console.log("Card deleted")}
        >
          Удалить карту
        </Button>
      </Box>
    </Fade>
  );
}
