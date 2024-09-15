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
