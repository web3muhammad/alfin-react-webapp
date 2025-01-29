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