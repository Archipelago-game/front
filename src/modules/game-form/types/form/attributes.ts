interface BaseSkill {
  id: string;
  name: string;
  focus: number;
}

interface BaseSkillGroup<T extends string> {
  name: string;
  expertise: number;
  OZ: number;
  skills: Record<T, BaseSkill>;
}

// ---------- Dexterity ----------
type TraditionalSkillId = "melee" | "archery" | "martialArts";
type MobilitySkillId = "acrobatics" | "stealth";

export interface Dexterity {
  value: number;
  traditional: BaseSkillGroup<TraditionalSkillId>;
  mobility: BaseSkillGroup<MobilitySkillId>;
}

// ---------- Insight ----------
type SocialSkillId = "persuasion" | "manipulation";
type PresenceSkillId = "leadership" | "animalHandling";
type PerceptionSkillId = "awareness" | "insight" | "thievery";

export interface Insight {
  value: number;
  social: BaseSkillGroup<SocialSkillId>;
  presence: BaseSkillGroup<PresenceSkillId>;
  perception: BaseSkillGroup<PerceptionSkillId>;
}

// ---------- Coordination ----------
type FirearmsSkillId = "pistols" | "arquebuses" | "fieldsQueen";
type SeafaringSkillId = "helmsman" | "boatswain";
type DefenseSkillId = "parry" | "cover";

export interface Coordination {
  value: number;
  firearms: BaseSkillGroup<FirearmsSkillId>;
  seafaring: BaseSkillGroup<SeafaringSkillId>;
  defense: BaseSkillGroup<DefenseSkillId>;
}

// ---------- WillPower ----------
type DisciplineSkillId = "order" | "navigation" | "faith";

export interface WillPower {
  value: number;
  discipline: BaseSkillGroup<DisciplineSkillId>;
}

// ---------- Strength ----------
type EnduranceSkillId = "athletics" | "resistance";

export interface Strength {
  value: number;
  endurance: BaseSkillGroup<EnduranceSkillId>;
}

// ---------- Intelligence ----------
type CraftSkillId = "craft1" | "craft2";
type KnowledgeSkillId = "civilization" | "medicine" | "strategy" | "nature";

export interface Intelligence {
  value: number;
  craft: BaseSkillGroup<CraftSkillId>;
  knowledge: BaseSkillGroup<KnowledgeSkillId>;
}

export interface Stats {
  dexterity: Dexterity;

  coordination: Coordination;

  insight: Insight;

  intelligence: Intelligence;

  willpower: WillPower;

  strength: Strength;
}
