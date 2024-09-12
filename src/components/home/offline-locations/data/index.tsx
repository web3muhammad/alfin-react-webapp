import { PlaceRounded } from "@mui/icons-material";

interface Service {
  icon: JSX.Element;
  title: string;
  adress: string;
  mapLink: string;
}

export const services: Service[] = [
  {
    icon: <PlaceRounded sx={{ width: "20px" }} color="primary" />,
    title: "Дубай",
    adress: "6 дорога, Эль Мактум Хоспитал",
    mapLink: "https://yandex.ru/maps/?ll=55.277013%2C25.263432&z=17", // Example Yandex Map link
  },
  {
    icon: <PlaceRounded sx={{ width: "20px" }} color="primary" />,
    title: "Стамбул",
    adress: "Fethibey Cad, №26/28, Laleli Galleria 119",
    mapLink: "https://yandex.ru/maps/?ll=28.971452%2C41.005321&z=17", // Example Yandex Map link
  },
  {
    icon: <PlaceRounded sx={{ width: "20px" }} color="primary" />,
    title: "Москва",
    adress: "Москва Сити, Башня Федерация, 67 этаж, 6707б офис",
    mapLink: "https://yandex.ru/maps/?ll=37.535890%2C55.749473&z=17", // Example Yandex Map link
  },
];
