import { defaultStats } from "./stats-default.const.ts";
import type { FormType } from "../types/form/form.type.ts";
import { defaultAttack } from "./attack-default.const.ts";
import { defaultTalents } from "./talents-default.const.ts";

export const FORM_DEFAULT_VALUES: FormType = {
  name: "",
  age: 0,
  homeland: "",
  languages: "",
  race: "human",
  immortal: {
    checked: false,
    experience: {
      salted: 0,
    },
  },
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
  attack: defaultAttack,
  defence: {
    brave: 0,
    physical: {
      tiredness: { value: 0 },
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
        list: [
          { value: "empty" },
          { value: "empty" },
          { value: "empty" },
          { value: "empty" },
          { value: "empty" },
        ],
      },
    },
    mental: {
      despair: { value: 0 },
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
        list: [
          { value: "empty" },
          { value: "empty" },
          { value: "empty" },
          { value: "empty" },
          { value: "empty" },
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
  inventory: {
    equipment: {
      list: [{ value: "" }],
    },
    wallet: 0,
  },
  talents: defaultTalents,
  notes: {
    text: "",
  },
  moralValue: {
    authority: "",
    pride: "",
    rivalry: "",
    idealism: "",
    individualism: "",
  },
};
