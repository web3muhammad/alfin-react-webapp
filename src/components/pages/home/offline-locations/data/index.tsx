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
    adress: "6 дорога, Эль Мактум Хоспитал, После Арки FSM офис",
    mapLink: "https://maps.google.com/?q=25.268614,55.304089",
  },
  {
    icon: <PlaceRounded sx={{ width: "20px" }} color="primary" />,
    title: "Стамбул",
    adress: "Обмен Крипты и валюты, в Галатопорте",
    mapLink:
      "https://www.google.com/maps?q=41.00882339477539,28.954137802124023",
  },
  {
    icon: <PlaceRounded sx={{ width: "20px" }} color="primary" />,
    title: "Москва",
    adress:
      "Торговый центр Горбушка. Старая Горбушка. Барклая 8, 2 этаж. Офис 231 ",
    mapLink:
      "https://maps.apple.com/?address=%D1%83%D0%BB%D0%B8%D1%86%D0%B0%20%D0%91%D0%B0%D1%80%D0%BA%D0%BB%D0%B0%D1%8F,%208,%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0,%20%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F,%20121087&auid=1550672144693141674&ll=55.741171,37.502799&lsp=9902&q=%D0%93%D0%BE%D1%80%D0%B1%D1%83%D1%88%D0%BA%D0%B0,%20%D1%82%D0%BE%D1%80%D0%B3%D0%BE%D0%B2%D1%8B%D0%B9%20%D1%86%D0%B5%D0%BD%D1%82%D1%80&t=m",
  },
];
