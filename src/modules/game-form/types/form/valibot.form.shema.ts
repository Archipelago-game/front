import {
  object,
  string,
  number,
  boolean,
  array,
  record,
  literal,
  picklist,
  parse,
} from "valibot";

// Вспомогательные схемы
const TextItemSchema = object({ value: string() });

const CheckboxSchema = object({ checked: boolean() });
const CheckBoxListSchema = object({
  amount: number(),
  list: array(CheckboxSchema),
});

const AttackMethodSchema = object({
  name: string(),
  distance: number(),
  half: number(),
  size: number(),
  damage: number(),
  loads: CheckBoxListSchema,
  properties: string(),
});

const AttackMethodsSchema = object({
  amount: number(),
  list: array(AttackMethodSchema),
});

const AttackSchema = object({
  damageBonus: object({
    physical: number(),
    mental: number(),
  }),
  methods: AttackMethodsSchema,
});

const DefenceSchema = object({
  brave: number(),
  physical: object({
    health: CheckBoxListSchema,
    wounds: CheckBoxListSchema,
  }),
  mental: object({
    resolve: CheckBoxListSchema,
    injuries: CheckBoxListSchema,
  }),
  armor: object({
    property: string(),
    slots: object({
      head: number(),
      body: number(),
      leftHand: number(),
      rightHand: number(),
      leftLeg: number(),
      rightLeg: number(),
    }),
  }),
});

const TalentSchema = object({
  name: string(),
  branch: string(),
  effect: string(),
  rang: number(),
});

const TalentsSchema = object({
  amount: number(),
  list: array(TalentSchema),
});

const NotesSchema = object({ text: string() });

const MoralValueSchema = object({
  authority: string(),
  pride: string(),
  rivalry: string(),
  idealism: string(),
  individualism: string(),
});

const ImmortalSchema = object({
  checked: boolean(),
  experience: object({
    salted: number(),
    deferred: number(),
  }),
});

// === Навыки и характеристики ===
const BaseSkillSchema = <T extends string>(id: T) =>
  object({
    id: literal(id),
    name: string(),
    focus: number(),
  });

const SkillListSchema = <T extends string>(ids: readonly T[]) =>
  record(picklist(ids), BaseSkillSchema(ids[0] as T));

const BaseSkillGroupSchema = <T extends string>(ids: readonly T[]) =>
  object({
    name: string(),
    expertise: number(),
    OZ: number(),
    skills: SkillListSchema(ids),
  });

// Конкретные группы навыков
const DexteritySchema = object({
  value: number(),
  name: string(),
  traditional: BaseSkillGroupSchema([
    "melee",
    "archery",
    "martialArts",
  ] as const),
  mobility: BaseSkillGroupSchema(["acrobatics", "stealth"] as const),
});

const InsightSchema = object({
  value: number(),
  name: string(),
  social: BaseSkillGroupSchema(["persuasion", "manipulation"] as const),
  presence: BaseSkillGroupSchema(["leadership", "animalHandling"] as const),
  perception: BaseSkillGroupSchema([
    "awareness",
    "insight",
    "thievery",
  ] as const),
});

const CoordinationSchema = object({
  value: number(),
  name: string(),
  firearms: BaseSkillGroupSchema([
    "pistols",
    "arquebuses",
    "fieldsQueen",
  ] as const),
  seafaring: BaseSkillGroupSchema(["helmsman", "boatswain"] as const),
  defense: BaseSkillGroupSchema(["parry", "cover"] as const),
});

const WillPowerSchema = object({
  value: number(),
  name: string(),
  discipline: BaseSkillGroupSchema(["order", "navigation", "faith"] as const),
});

const StrengthSchema = object({
  value: number(),
  name: string(),
  endurance: BaseSkillGroupSchema(["athletics", "resistance"] as const),
});

const IntelligenceSchema = object({
  value: number(),
  name: string(),
  craft: BaseSkillGroupSchema(["craft1", "craft2"] as const),
  knowledge: BaseSkillGroupSchema([
    "civilization",
    "medicine",
    "strategy",
    "nature",
  ] as const),
});

const StatsSchema = object({
  dexterity: DexteritySchema,
  insight: InsightSchema,
  coordination: CoordinationSchema,
  willpower: WillPowerSchema,
  strength: StrengthSchema,
  intelligence: IntelligenceSchema,
});

// === Основная схема FormType ===
export const FormSchema = object({
  name: string(),
  age: number(),
  homeland: string(),
  languages: string(),
  immortal: ImmortalSchema,
  luck: CheckBoxListSchema,
  experience: object({
    total: number(),
    used: number(),
  }),
  attack: AttackSchema,
  defence: DefenceSchema,
  stats: StatsSchema,
  inventory: object({
    equipment: object({ list: array(TextItemSchema) }),
    wallet: number(),
  }),
  talents: TalentsSchema,
  notes: NotesSchema,
  moralValue: MoralValueSchema,
});

// Тип для TypeScript (инференс идеальный)
export type SchemaFormType = typeof FormSchema.type;

// Функция валидации файла
export const parseFormFile = async (json: string) => {
  return parse(FormSchema, json);
};
