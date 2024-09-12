import {
  AccountBalanceRounded,
  PaymentsRounded,
  PersonPinCircleRounded,
  ReplayRounded,
  SendRounded,
} from "@mui/icons-material";

interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    icon: <PaymentsRounded sx={{ width: "20px" }} color="primary" />,
    title: "Обмен иностранной валюты переводом и наличными",
    description: "Лиры, тенге, дирхамы, евро",
  },
  {
    icon: (
      <SendRounded sx={{ width: "20px", marginLeft: "3px" }} color="primary" />
    ),
    title: "Переводы заграницу в иностранной валюте",
    description: "",
  },
  {
    icon: <AccountBalanceRounded sx={{ width: "20px" }} color="primary" />,
    title: "Оплата инвойсов SWIFT",
    description: "Линк переводы",
  },
  {
    icon: (
      <ReplayRounded
        sx={{ width: "20px", transform: "rotate(30deg) scale(-1, 1)" }}
        color="primary"
      />
    ),
    title: "Оплата подписок",
    description: "",
  },
  {
    icon: <PersonPinCircleRounded sx={{ width: "20px" }} color="primary" />,
    title: "Доставка наличной валюты",
    description: "Перестановка валюты в разных странах",
  },
];
