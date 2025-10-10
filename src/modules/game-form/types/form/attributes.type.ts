export interface BaseSkill<T extends string> {
  id: T;
  name: string;
  focus: number;
}

export type SkillList<T extends string> = { [key in T]: BaseSkill<T> };

export interface BaseSkillGroup<T extends string> {
  name: string;
  expertise: number;
  OZ: number;
  skills: SkillList<T>;
}

export interface BaseAttribute {
  value: number;
  name: string;
}

// --- Dexterity ---

export type TraditionalSkillId = "melee" | "archery" | "martialArts";
export type MobilitySkillId = "acrobatics" | "stealth";

export interface Dexterity extends BaseAttribute {
  traditional: BaseSkillGroup<TraditionalSkillId>;
  mobility: BaseSkillGroup<MobilitySkillId>;
}

// --- Insight ---

export type SocialSkillId = "persuasion" | "manipulation";
export type PresenceSkillId = "leadership" | "animalHandling";
export type PerceptionSkillId = "awareness" | "insight" | "thievery";

export interface Insight extends BaseAttribute {
  social: BaseSkillGroup<SocialSkillId>;
  presence: BaseSkillGroup<PresenceSkillId>;
  perception: BaseSkillGroup<PerceptionSkillId>;
}

// --- Coordination ---

export type FirearmsSkillId = "pistols" | "arquebuses" | "fieldsQueen";
export type SeafaringSkillId = "helmsman" | "boatswain";
export type DefenseSkillId = "parry" | "cover";

export interface Coordination extends BaseAttribute {
  firearms: BaseSkillGroup<FirearmsSkillId>;
  seafaring: BaseSkillGroup<SeafaringSkillId>;
  defense: BaseSkillGroup<DefenseSkillId>;
}

// --- WillPower ---

export type DisciplineSkillId = "order" | "navigation" | "faith";

export interface WillPower extends BaseAttribute {
  discipline: BaseSkillGroup<DisciplineSkillId>;
}

// --- Strength ---

export type EnduranceSkillId = "athletics" | "resistance";

export interface Strength extends BaseAttribute {
  endurance: BaseSkillGroup<EnduranceSkillId>;
}

// --- Intelligence ---

export type CraftSkillId = "craft1" | "craft2";
export type KnowledgeSkillId =
  | "civilization"
  | "medicine"
  | "strategy"
  | "nature";

export interface Intelligence extends BaseAttribute {
  craft: BaseSkillGroup<CraftSkillId>;
  knowledge: BaseSkillGroup<KnowledgeSkillId>;
}

// --- Общие характеристики ---

export interface Stats {
  dexterity: Dexterity;
  insight: Insight;
  coordination: Coordination;
  willpower: WillPower;
  strength: Strength;
  intelligence: Intelligence;
}
