import InputMask from "react-input-mask";
import { useState, MouseEvent } from "react";
import {
  Box,
  TextField,
  Typography,
  Divider,
  MenuItem,
  Menu,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Block, Button } from "../../components/shared";
import { formatNumber, isPhoneComplete } from "../../utils";
import { useTelegram } from "../../hooks";
import { SelectArrowsIcon } from "../../icons";

type FormData = {
  name: string;
  phone: string;
  paymentService: string;
  bankCard: string;
  promocode?: string;
};

const banks = ["Sberbank", "T-Bank", "Альфа-Банк"];
const bankCards = ["Вакиф Турецкая", "Deniz Bank"];

function MenuComponent({
  anchorEl,
  open,
  onClose,
  items,
  onSelect,
  menuType,
}: {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  items: string[];
  onSelect: (item: string) => void;
  menuType: "bank" | "card";
}) {
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
          <MenuItem
            sx={{ paddingBlock: "0", marginBlock: "0" }}
            onClick={() => onSelect(item)}
          >
            {item}
          </MenuItem>
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
    </Menu>
  );
}

export function PaymentForm() {
  const { user } = useTelegram();
  const location = useLocation();
  const { state } = location;
  const { amount, calculatedAmount, isBuying, selectedCurrency } = state || {};

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [selectedBankCard, setSelectedBankCard] = useState<string>("");
  const [menuType, setMenuType] = useState<"banks" | "cards">("banks");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange", // Ensures validation on every change
    defaultValues: {
      name: user?.first_name || "",
      phone: "",
      paymentService: "",
      bankCard: "",
      promocode: "",
    },
  });

  const name = watch("name");
  const phone = watch("phone");
  const paymentService = watch("paymentService");
  const bankCard = watch("bankCard");

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const handleMenuOpen = (
    event: MouseEvent<HTMLElement>,
    type: "banks" | "cards"
  ) => {
    setMenuType(type);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSelection = (item: string) => {
    if (menuType === "banks") {
      setSelectedBank(item);
      setValue("paymentService", item);
    } else if (menuType === "cards") {
      setSelectedBankCard(item);
      setValue("bankCard", item);
    }
    handleMenuClose();
  };

  // Check if all required fields are filled
  const isButtonDisabled = !(
    name &&
    isPhoneComplete(phone) &&
    selectedBank &&
    selectedBankCard
  );

  return (
    <Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography
          sx={{ fontSize: "3rem", fontWeight: "500", textAlign: "center" }}
        >
          {amount} {isBuying ? selectedBank : "RUB"}
        </Typography>
        <Typography sx={{ opacity: ".5", fontSize: "1rem" }}>
          = {formatNumber(calculatedAmount)}{" "}
          {isBuying ? "RUB" : selectedCurrency}
        </Typography>
      </Box>

      <Block sx={{ marginTop: "1.25rem" }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
                },
                "& fieldset": { border: "none" },
              }}
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
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
              value={watch("phone")}
              onChange={(e) => setValue("phone", e.target.value)}
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
                onClick={(e) => handleMenuOpen(e, "banks")}
              >
                {selectedBank || "Выберите банк"}
              </Typography>
              <SelectArrowsIcon />
            </Box>
            <MenuComponent
              anchorEl={anchorEl}
              open={menuType === "banks" && Boolean(anchorEl)}
              onClose={handleMenuClose}
              items={banks}
              onSelect={handleSelection}
              menuType="bank"
            />
          </Box>
          <Divider sx={{ margin: "12px 0px" }} />

          {/* Bank Card Menu Select */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginTop: "1rem",
            }}
          >
            <Typography>Карта зачисления</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  cursor: "pointer",
                  color: "primary.main",
                  paddingRight: "3px",
                }}
                onClick={(e) => handleMenuOpen(e, "cards")}
              >
                {selectedBankCard || "Выберите карту"}
              </Typography>
              <SelectArrowsIcon />
            </Box>
            <MenuComponent
              anchorEl={anchorEl}
              open={menuType === "cards" && Boolean(anchorEl)}
              onClose={handleMenuClose}
              items={bankCards}
              onSelect={handleSelection}
              menuType="card"
            />
          </Box>
          <Divider sx={{ margin: "12px 0px" }} />

          {/* Promocode Input */}
          <Box
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
          </Box>

          <Button
            sx={{ marginTop: "1.5rem" }}
            type="submit"
            disabled={isButtonDisabled}
          >
            Отправить заявку
          </Button>
        </Box>
      </Block>
    </Box>
  );
}
