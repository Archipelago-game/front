import type { Talent, Talents } from "../types/form/form.type.ts";

export const defaultTalent: Talent = {
  name: "",
  branch: "",
  effect: "",
  rang: 0,
};

export const talentsList: Talent[] = [
  {
    name: "Железная воля",
    branch: "Воля",
    effect:
      "Позволяет сопротивляться эффектам страха и контроля. Каждый ранг снижает длительность подобных эффектов на 10%.",
    rang: 1,
  },
  {
    name: "Инстинкт выжившего",
    branch: "Выносливость",
    effect:
      "Повышает устойчивость к физическому урону. Каждый ранг увеличивает максимальное здоровье на 5%.",
    rang: 1,
  },
  {
    name: "Тень и шаг",
    branch: "Ловкость",
    effect:
      "Увеличивает скорость передвижения и скрытность. Каждый ранг снижает шанс быть замеченным на 5%.",
    rang: 1,
  },
  {
    name: "Тактическое чутьё",
    branch: "Интеллект",
    effect:
      "Даёт бонус к инициативе и точности атак. Каждый ранг повышает инициативу на 2 и шанс попадания на 3%.",
    rang: 1,
  },
];

export const defaultTalents: Talents = {
  amount: 1,
  list: [],
};
