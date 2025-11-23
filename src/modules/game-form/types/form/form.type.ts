import type { Stats } from "./attributes.type.ts";

interface TextItem {
  value: string;
}

export interface TextList {
  list: TextItem[];
}

export interface FormArrayFields<T> {
  amount: number;
  list: T[];
}

export interface Checkbox {
  checked: boolean;
}
// todo убрать из FormArrayFields amount. Добавлять по необходимости через &{amount: number}
export type CheckBoxList = FormArrayFields<Checkbox>;

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

export interface Attack {
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

export interface Talent {
  name: string;
  branch: string;
  effect: string;
  rang: number;
}

export interface Notes {
  text: string;
}

export interface MoralValue {
  authority: string;
  pride: string;
  rivalry: string;
  idealism: string;
  individualism: string;
}

export type Talents = FormArrayFields<Talent>;

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
  inventory: {
    equipment: TextList;
    wallet: number;
  };
  talents: Talents;
  notes: Notes;
  moralValue: MoralValue;
}
