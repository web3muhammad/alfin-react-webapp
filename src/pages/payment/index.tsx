import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, TextField, Button, MenuItem } from "@mui/material";

// Define types for form fields
type FormData = {
  name: string;
  phone: string;
  paymentService: string;
  cardNumber: string;
};

export const PaymentForm: React.FC = () => {
  const location = useLocation();
  const { state } = location; // Access the passed state
  const { amount, selectedCurrency, calculatedAmount } = state || {};

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Handle form submission logic
    console.log(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "16px",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <h3>Payment Form</h3>

      {/* Display passed data */}
      <p>Amount: {amount}</p>
      <p>Selected Currency: {selectedCurrency}</p>
      <p>Calculated Amount: {calculatedAmount}</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Name"
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
        />

        <TextField
          label="Phone"
          type="tel"
          {...register("phone", { required: "Phone is required" })}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          fullWidth
        />

        <TextField
          select
          label="Payment Service"
          defaultValue=""
          {...register("paymentService", { required: "Payment Service is required" })}
          error={!!errors.paymentService}
          helperText={errors.paymentService?.message}
          fullWidth
        >
          <MenuItem value="Sberbank">Sberbank</MenuItem>
          <MenuItem value="T-Bank">T-Bank</MenuItem>
        </TextField>

        <TextField
          label="Card Number"
          type="text"
          {...register("cardNumber", { required: "Card number is required" })}
          error={!!errors.cardNumber}
          helperText={errors.cardNumber?.message}
          fullWidth
        />

        <Button type="submit" variant="contained" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};
