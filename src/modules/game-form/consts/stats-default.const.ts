import type {
  Coordination,
  Dexterity,
  Insight,
  Intelligence,
  Stats,
  Strength,
  WillPower,
} from "../types/form/attributes.type.ts";

// --- атрибуты и дефолты ---

const defaultDexterity: Dexterity = {
  name: "Ловкость",
  value: 0,
  traditional: {
    name: "Традиционные",
    expertise: 0,
    OZ: 0,
    skills: {
      melee: { id: "melee", name: "Ближний бой", focus: 0 },
      archery: { id: "archery", name: "Лук", focus: 0 },
      martialArts: { id: "martialArts", name: "Боевые искусства", focus: 0 },
    },
  },
  mobility: {
    name: "Подвижность",
    expertise: 0,
    OZ: 0,
    skills: {
      acrobatics: { id: "acrobatics", name: "Акробатика", focus: 0 },
      stealth: { id: "stealth", name: "Скрытность", focus: 0 },
    },
  },
};

const defaultInsight: Insight = {
  name: "Проницательность",
  value: 0,
  social: {
    name: "Социальные",
    expertise: 0,
    OZ: 0,
    skills: {
      persuasion: { id: "persuasion", name: "Убеждение", focus: 0 },
      manipulation: { id: "manipulation", name: "Манипуляция", focus: 0 },
    },
  },
  presence: {
    name: "Присутствие",
    expertise: 0,
    OZ: 0,
    skills: {
      leadership: { id: "leadership", name: "Командование", focus: 0 },
      animalHandling: {
        id: "animalHandling",
        name: "Общение с животными",
        focus: 0,
      },
    },
  },
  perception: {
    name: "Чувства",
    expertise: 0,
    OZ: 0,
    skills: {
      awareness: { id: "awareness", name: "Наблюдательность", focus: 0 },
      insight: { id: "insight", name: "Понимание", focus: 0 },
      thievery: { id: "thievery", name: "Воровство", focus: 0 },
    },
  },
};

const defaultCoordination: Coordination = {
  name: "Координация",
  value: 0,
  firearms: {
    name: "Огнестрельное",
    expertise: 0,
    OZ: 0,
    skills: {
      pistols: { id: "pistols", name: "Пистолеты", focus: 0 },
      arquebuses: { id: "arquebuses", name: "Аркебузы", focus: 0 },
      fieldsQueen: { id: "fieldsQueen", name: "Царица полей", focus: 0 },
    },
  },
  seafaring: {
    name: "Мореплавание",
    expertise: 0,
    OZ: 0,
    skills: {
      helmsman: { id: "helmsman", name: "Рулевой", focus: 0 },
      boatswain: { id: "boatswain", name: "Боцман", focus: 0 },
    },
  },
  defense: {
    name: "Защита",
    expertise: 0,
    OZ: 0,
    skills: {
      parry: { id: "parry", name: "Парирование", focus: 0 },
      cover: { id: "cover", name: "Укрытие", focus: 0 },
    },
  },
};

const defaultWillPower: WillPower = {
  name: "Сила воли",
  value: 0,
  discipline: {
    name: "Дисциплина",
    expertise: 0,
    OZ: 0,
    skills: {
      order: { id: "order", name: "Порядок", focus: 0 },
      navigation: { id: "navigation", name: "Навигация", focus: 0 },
      faith: { id: "faith", name: "Вера", focus: 0 },
    },
  },
};

const defaultStrength: Strength = {
  name: "Сила",
  value: 0,
  endurance: {
    name: "Выносливость",
    expertise: 0,
    OZ: 0,
    skills: {
      athletics: { id: "athletics", name: "Атлетика", focus: 0 },
      resistance: { id: "resistance", name: "Сопротивление", focus: 0 },
    },
  },
};

const defaultIntelligence: Intelligence = {
  name: "Интеллект",
  value: 0,
  craft: {
    name: "Ремесло",
    expertise: 0,
    OZ: 0,
    skills: {
      craft1: { id: "craft1", name: "", focus: 0 },
      craft2: { id: "craft2", name: "", focus: 0 },
    },
  },
  knowledge: {
    name: "Знания",
    expertise: 0,
    OZ: 0,
    skills: {
      civilization: { id: "civilization", name: "Цивилизация", focus: 0 },
      medicine: { id: "medicine", name: "Медицина", focus: 0 },
      strategy: { id: "strategy", name: "Стратегия", focus: 0 },
      nature: { id: "nature", name: "Природа", focus: 0 },
    },
  },
};

// --- итоговый объект ---

export const defaultStats: Stats = {
  dexterity: defaultDexterity,
  insight: defaultInsight,
  coordination: defaultCoordination,
  willpower: defaultWillPower,
  strength: defaultStrength,
  intelligence: defaultIntelligence,
};
