export type HomelandId =
  | "cat_islands"
  | "suo"
  | "trieldom"
  | "inis"
  | "maori"
  | "carthage"
  | "shlyakhta";

export interface HomelandOption {
  id: HomelandId;
  displayName: string;
  language: string;
  talent: string;
  /** Только для расы «Кот», по умолчанию для котов */
  catOnly?: boolean;
}

/** Родина по умолчанию для котов, показывается только при race === "cat" */
export const CAT_HOMELAND_OPTION: HomelandOption = {
  id: "cat_islands",
  displayName: "Острова Кошек",
  language: "—",
  talent: "—",
  catOnly: true,
};

export const HOMELAND_OPTIONS: HomelandOption[] = [
  {
    id: "suo",
    displayName: "Суо (внешние острова)",
    language: "Соответственный",
    talent: "Стойкость и Гармония",
  },
  {
    id: "trieldom",
    displayName: "Царство Триединое",
    language: "Триединая Речь",
    talent: "За Песнь, Царя и Отечество",
  },
  {
    id: "inis",
    displayName: "Империя Инис",
    language: "Гаэльге",
    talent: "Ружья, барабаны и сталь",
  },
  {
    id: "maori",
    displayName: "Маори",
    language: "Маори",
    talent: "Урождённые Навигаторы",
  },
  {
    id: "carthage",
    displayName: "Карфаж",
    language: "Глоса",
    talent: "Избранники Солнца",
  },
  {
    id: "shlyakhta",
    displayName: "Шляхта (срединные острова)",
    language: "Соответственный",
    talent: "Торговля и Ремесло",
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
