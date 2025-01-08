import { useEffect } from "react";

export function useTelegramBackButton(callback: () => void) {
  useEffect(() => {
    const tg = Telegram.WebApp;

    const handleBackButtonClick = () => {
      callback();
    };

    tg.BackButton.show();
    tg.onEvent("backButtonClicked", handleBackButtonClick);

    return () => {
      tg.BackButton.hide();
      tg.offEvent("backButtonClicked", handleBackButtonClick);
    };
  }, [callback]);
}
