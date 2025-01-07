import { useTelegramTheme } from "../hooks";

export function SelectArrowsIcon() {
  const theme = useTelegramTheme();

  return (
    <svg
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_1508)">
        <path
          d="M2.5 8.25L6 11.25L9.5 8.25"
          stroke={theme.palette.primary.main}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.5 4.75L6 1.75L9.5 4.75"
          stroke={theme.palette.primary.main}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_1508">
          <rect
            width="12"
            height="12"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export const SuccessSnackbarIcon = () => {
  const theme = useTelegramTheme();
  return (
    <svg
      style={{ marginRight: "5px" }}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="9.00064"
        cy="9.00061"
        r="9"
        fill={theme.palette.primary.main}
      />
      <path
        d="M6.18719 9.00037L7.98641 10.7996C8.23537 11.0485 8.63902 11.0485 8.88798 10.7996L12.9372 6.75037"
        stroke="white"
        stroke-width="2"
      />
    </svg>
  );
};

export const ErrorSnackbarIcon = () => {
  const theme = useTelegramTheme();

  return (
    <svg
      style={{ marginRight: "5px" }}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="8.99998"
        cy="8.99998"
        r="8.67857"
        fill={theme.palette.primary.main}
      />
      <path d="M6.10724 11.8923L11.893 6.10662" stroke="white" />
      <path d="M11.8929 11.8928L6.10717 6.10711" stroke="white" />
    </svg>
  );
};
