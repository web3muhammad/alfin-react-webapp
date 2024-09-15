import InputMask from "react-input-mask";
import { Box, TextField, Typography, Divider, Fade } from "@mui/material";
import { useForm } from "react-hook-form";
import { Block, Button, Title } from "../../components/shared";
import { isPhoneComplete } from "../../utils"; // Assuming this utility function exists

type FormData = {
  name: string;
  phone: string;
};

// Mock server data
const data = { name: "Рамазан", phone: "+7 932 248 80 05" };

export function PersonalDataForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<FormData>({
    defaultValues: {
      name: data.name,
      phone: data.phone,
    },
  });

  const onSubmit = (formData: FormData) => {
    console.log(formData);
  };

  const isPhoneValid = isPhoneComplete(watch("phone"));

  const isModified = dirtyFields.name || dirtyFields.phone;

  return (
    <Fade in>
      <Box>
        <Title>Личные данные</Title>

        <Block>
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
                  },
                  "& fieldset": { border: "none" },
                }}
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
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
                mask="+7 999 999 99 99"
                value={watch("phone")}
                onChange={(e) =>
                  setValue("phone", e.target.value, { shouldDirty: true })
                }
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
                  helperText={errors.phone?.message}
                  fullWidth
                />
              </InputMask>
            </Box>
          </Box>
        </Block>

        <Button
          onClick={handleSubmit(onSubmit)}
          sx={{ marginTop: "1.5rem" }}
          type="submit"
          disabled={!isModified || !isPhoneValid}
        >
          Сохранить изменения
        </Button>
      </Box>
    </Fade>
  );
}
