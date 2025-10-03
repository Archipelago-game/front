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

interface BaseSkill {
  experience: number;
  OZ: number;
}

interface Dexterity {
  value: number;
  traditional: BaseSkill & {
    melee: boolean;
    archery: boolean;
    martialArts: boolean;
  };
  mobility: BaseSkill & {
    acrobatics: boolean;
    stealth: boolean;
  };
}

interface Insight {
  value: number;
  social: BaseSkill & {
    persuasion: boolean;
    manipulation: boolean;
  };
  presence: BaseSkill & {
    leadership: boolean;
    animalHandling: boolean;
  };
  perception: BaseSkill & {
    awareness: boolean;
    insight: boolean;
    thievery: boolean;
  };
}

interface Coordination {
  value: number;
  firearms: BaseSkill & {
    pistols: boolean;
    arquebuses: boolean;
    fieldsQueen: boolean;
  };
  seafaring: BaseSkill & {
    helmsman: boolean;
    boatswain: boolean;
  };
  defense: BaseSkill & {
    parry: boolean;
    cover: boolean;
  };
}

interface WillPower {
  value: number;
  discipline: BaseSkill & {
    order: number;
    navigation: number;
    faith: number;
  };
}

interface Strength {
  value: number;
  endurance: BaseSkill & {
    athletics: number;
    resistance: number;
  };
}

interface Intelligence {
  value: number;
  craft: BaseSkill & {
    name: string;
    focus: boolean;
  };

  knowledge: BaseSkill & {
    civilization: number;
    medicine: number;
    strategy: number;
    nature: number;
  };
}

interface Stats {
  dexterity: Dexterity;

  intelligence: Intelligence;

  strength: Strength;

  coordination: Coordination;

  insight: Insight;

  willpower: WillPower;
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
}
