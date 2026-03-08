import type { CarouselItem } from "../../../common/components/carousel/Carousel.tsx";
import CountryImg from "../../../common/components/img/race-silhouettes/CountryImg.tsx";

const DEFAULT_HOMELAND_IMAGE = "/img/country/default_country.png";

export type HomelandId = string &
  (
    | "cat_islands"
    | "suo"
    | "trieldom"
    | "inis"
    | "maori"
    | "carthage"
    | "shlyakhta"
  );

export interface HomelandOption {
  id: HomelandId;
  displayName: string;
  language: string;
  talent: string;
  /** Только для расы «Кот», по умолчанию для котов */
  catOnly?: boolean;
}

export type HomelandCarouselItem = CarouselItem<HomelandId> & HomelandOption;

/** Родина по умолчанию для котов, показывается только при race === "cat" */
export const CAT_HOMELAND_OPTION: HomelandCarouselItem = {
  id: "cat_islands",
  displayName: "Острова Кошек",
  language: "—",
  talent: "—",
  catOnly: true,
  element: <CountryImg src={DEFAULT_HOMELAND_IMAGE} />,
};

export const HOMELAND_OPTIONS: HomelandCarouselItem[] = [
  {
    id: "suo",
    displayName: "Суо (внешние острова)",
    language: "Язык Суо",
    talent: "Стойкость и Гармония",
    element: <CountryImg src={DEFAULT_HOMELAND_IMAGE} />,
  },
  {
    id: "trieldom",
    displayName: "Царство Триединое",
    language: "Триединая Речь",
    talent: "За Песнь, Царя и Отечество",
    element: <CountryImg src={DEFAULT_HOMELAND_IMAGE} />,
  },
  {
    id: "inis",
    displayName: "Империя Инис",
    language: "Гаэльге",
    talent: "Ружья, барабаны и сталь",
    element: <CountryImg src="/img/country/inis.jpg" />,
  },
  {
    id: "maori",
    displayName: "Маори",
    language: "Маори",
    talent: "Урождённые Навигаторы",
    element: <CountryImg src={DEFAULT_HOMELAND_IMAGE} />,
  },
  {
    id: "carthage",
    displayName: "Карфаж",
    language: "Глоса",
    talent: "Избранники Солнца",
    element: <CountryImg src={DEFAULT_HOMELAND_IMAGE} />,
  },
  {
    id: "shlyakhta",
    displayName: "Шляхта (срединные острова)",
    language: "Шляхтсикй",
    talent: "Торговля и Ремесло",
    element: <CountryImg src={DEFAULT_HOMELAND_IMAGE} />,
  },
];

export function getHomelandByD20(value: number): HomelandId {
  if (value >= 1 && value <= 5) return "inis";
  if (value >= 6 && value <= 10) return "trieldom";
  if (value >= 11 && value <= 15) return "shlyakhta";
  if (value >= 16 && value <= 18) return "suo";
  if (value === 19) return "maori";
  return "carthage"; // 20
}
