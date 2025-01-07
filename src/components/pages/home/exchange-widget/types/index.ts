export interface State {
  inputAmount1: number | string;
  inputAmount2: number | string;
  selectedCurrency: string;
  exchangeRate: number;
  isBuying: boolean;
  anchorEl: HTMLElement | null;
}

export type Action =
  | { type: "SET_AMOUNT1"; payload: number | string }
  | { type: "SET_AMOUNT2"; payload: number | string }
  | { type: "SET_CURRENCY"; payload: { currency: string; rate: number } }
  | { type: "TOGGLE_BUY_SELL" }
  | { type: "OPEN_MENU"; payload: HTMLElement }
  | { type: "CLOSE_MENU" };