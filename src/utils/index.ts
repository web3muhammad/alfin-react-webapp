// Helper function to format numbers with spaces
export const formatNumber = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const isPhoneComplete = (phone: string | undefined): boolean => {
  const strippedPhone = phone?.replace(/[^0-9]/g, "");
  return strippedPhone?.length === 11;
};

export const isCompleteCardNumber = (cardNumber: string): boolean => {
  return /^\d{16}$/.test(cardNumber.replace(/\s+/g, ""));
};

export const isValidTrc20Address = (address: string): boolean => {
  return /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(address);
};

export const isValidIban = (iban: string): boolean => {
  return /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/.test(iban.replace(/\s+/g, ""));
};

export const getDeclinedWord = (count: number): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return "проверок";
  }

  if (lastDigit === 1) {
    return "проверка";
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return "проверки";
  }

  return "проверок";
};
