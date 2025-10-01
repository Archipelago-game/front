export interface CheckBoxList {
  amount: number;
  list: {
    checked: boolean;
  }[];
}

export interface AttackMethod {
  name: string;
  distance: number;
  half: number;
  size: number;
  damage: number;
  loads: CheckBoxList;
}

export interface AttackMethods {
  amount: number;
  list: AttackMethod[];
}

export interface FormValues {
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
