import type { Stats } from "./attributes.type.ts";
import type { ThreePositionType } from "../../ui/components/fields/three-position-box/three-position-box.type.ts";

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

export interface Wound {
  value: ThreePositionType;
}

export interface Injures {
  value: ThreePositionType;
}

interface Defence {
  brave: number;
  physical: {
    tiredness: { value: number };
    health: CheckBoxList;
    wounds: {
      list: Wound[];
    };
  };
  mental: {
    despair: { value: number };
    resolve: CheckBoxList;
    injuries: {
      list: Injures[];
    };
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

export interface Immortal {
  checked: boolean;
  experience: {
    salted: number;
  };
}

export type Talents = FormArrayFields<Talent>;

export type Race = "human" | "cat" | "immortal";

export interface FormType {
  name: string;
  age: number;
  homeland: string;
  languages: string;
  immortal: Immortal;
  race: Race;
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
