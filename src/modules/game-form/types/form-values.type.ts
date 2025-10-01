export interface FormArrayFields<T> {
  amount: number;
  list: T[];
}

export type CheckBoxList = FormArrayFields<{
  checked: boolean;
}>;

export type AttackMethods = FormArrayFields<AttackMethod>;

export interface AttackMethod {
  name: string;
  distance: number;
  half: number;
  size: number;
  damage: number;
  loads: CheckBoxList;
  properties: string;
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
  attack: {
    damageBonus: {
      physical: number;
      mental: number;
    };
    methods: AttackMethods;
  };
}
