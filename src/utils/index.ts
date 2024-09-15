// Helper function to format numbers with spaces
export const formatNumber = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const isPhoneComplete = (phone: string | undefined): boolean => {
  const strippedPhone = phone?.replace(/[^0-9]/g, "");
  return strippedPhone?.length === 11;
};
