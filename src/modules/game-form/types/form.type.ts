import Dexterity from "../ui/sections/dexterity/Dexterity.tsx";

export interface FormArrayFields<T> {
  amount: number;
  list: T[];
}

export type CheckBoxList = FormArrayFields<{
  checked: boolean;
}>;

export interface AttackMethod {
  name: string;
  distance: number;
  half: number;
  size: number;
  damage: number;
  loads: CheckBoxList;
  properties: string;
}

export type AttackMethods = FormArrayFields<AttackMethod>;

interface Attack {
  damageBonus: {
    physical: number;
    mental: number;
  };
  methods: AttackMethods;
}

interface Defence {
  brave: number;
  physical: {
    health: CheckBoxList;
    wounds: CheckBoxList;
  };
  mental: {
    resolve: CheckBoxList;
    injuries: CheckBoxList;
  };
  armor: {
    property: string;
    slots: {
      head: number;
      body: number;
      leftHand: number;
      rightHand: number;
      leftLeg: number;
      rightLeg: number;
    };
  };
}

interface BaseSkillGroup {
  experience: number;
  OZ: number;
}

interface Dexterity {
  value: number;
  traditional: BaseSkillGroup & {
    melee: boolean;
    archery: boolean;
    martialArts: boolean;
  };
  mobility: BaseSkillGroup & {
    acrobatics: boolean;
    stealth: boolean;
  };
}

interface Insight {
  value: number;
  social: BaseSkillGroup & {
    persuasion: boolean;
    manipulation: boolean;
  };
  presence: BaseSkillGroup & {
    leadership: boolean;
    animalHandling: boolean;
  };
  perception: BaseSkillGroup & {
    awareness: boolean;
    insight: boolean;
    thievery: boolean;
  };
}

interface Coordination {
  value: number;
  firearms: BaseSkillGroup & {
    pistols: boolean;
    arquebuses: boolean;
    fieldsQueen: boolean;
  };
  seafaring: BaseSkillGroup & {
    helmsman: boolean;
    boatswain: boolean;
  };
  defense: BaseSkillGroup & {
    parry: boolean;
    cover: boolean;
  };
}

interface WillPower {
  value: number;
  discipline: BaseSkillGroup & {
    order: number;
    navigation: number;
    faith: number;
  };
}

interface Strength {
  value: number;
  endurance: BaseSkillGroup & {
    athletics: number;
    resistance: number;
  };
}

interface Intelligence {
  value: number;
  craft: BaseSkillGroup & {
    name: string;
    focus: boolean;
  };

  knowledge: BaseSkillGroup & {
    civilization: number;
    medicine: number;
    strategy: number;
    nature: number;
  };
}

interface Stats {
  dexterity: Dexterity;

  coordination: Coordination;

  insight: Insight;

  intelligence: Intelligence;

  willpower: WillPower;

  strength: Strength;
}

export interface FormType {
  name: string;
  age: number;
  homeland: string;
  languages: string;
  luck: CheckBoxList;
  experience: {
    total: number;
    used: number;
  };
  attack: Attack;
  defence: Defence;
  stats: Stats;
}
