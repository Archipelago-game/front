import type { FormType } from "../types/form.type.ts";

export const FORM_DEFAULT_VALUES: FormType = {
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
      list: [
        {
          name: "",
          distance: 0,
          half: 0,
          size: 0,
          damage: 0,
          loads: {
            amount: 5,
            list: [{ checked: false }],
          },
          properties: "",
        },
      ],
    },
  },
};
