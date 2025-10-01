import type { FormValues } from "../types/form-values.type.ts";

export const FORM_DEFAULT_VALUES: FormValues = {
  name: "",
  age: 0,
  homeland: "",
  languages: "",
  luck: {
    amount: 5,
    list: [],
  },
  experience: {
    total: 0,
    used: 0,
  },
  attack: {
    damageBonus: {
      physical: 0,
      mental: 0,
    },
    methods: {
      amount: 2,
      list: [],
    },
  },
};
