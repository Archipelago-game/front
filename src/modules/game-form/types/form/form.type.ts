import type { Stats } from "./attributes.ts";

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
