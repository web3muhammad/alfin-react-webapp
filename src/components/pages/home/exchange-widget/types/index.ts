export interface State {
  amount: number | string;
  selectedCurrency: string;
  exchangeRate: number;
  isBuying: boolean;
  anchorEl: HTMLElement | null;
}

export type Action =
  | { type: "SET_AMOUNT"; payload: number | string }
  | { type: "SET_CURRENCY"; payload: { currency: string; rate: number } }
  | { type: "TOGGLE_BUY_SELL" }
  | { type: "OPEN_MENU"; payload: HTMLElement }
  | { type: "CLOSE_MENU" };