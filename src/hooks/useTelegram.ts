const tg = Telegram.WebApp;

export const useTelegram = () => {
  const user = tg.initDataUnsafe.user;
  const themeParams = tg.themeParams;

  return {
    tg,
    user,
    themeParams
  };
};
