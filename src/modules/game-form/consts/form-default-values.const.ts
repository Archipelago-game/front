import { defaultStats } from "./stats-default.const.ts";
import type { FormType } from "../types/form/form.type.ts";

export const FORM_DEFAULT_VALUES: FormType = {
  name: "",
  age: 0,
  homeland: "",
  languages: "",
  luck: {
    amount: 5,
    list: [
      { checked: false },
      { checked: false },
      { checked: false },
      { checked: false },
      { checked: false },
    ],
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
  defence: {
    brave: 0,
    physical: {
      health: {
        amount: 20,
        list: [
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
        ],
      },
      wounds: {
        amount: 5,
        list: [
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
        ],
      },
    },
    mental: {
      resolve: {
        amount: 20,
        list: [
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
        ],
      },
      injuries: {
        amount: 5,
        list: [
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
          { checked: false },
        ],
      },
    },
    armor: {
      property: "",
      slots: {
        head: 0,
        body: 0,
        leftHand: 0,
        rightHand: 0,
        leftLeg: 0,
        rightLeg: 0,
      },
    },
  },
  stats: defaultStats,
};
