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
  defence: {
    brave: 0,
    physical: {
      health: {
        amount: 20,
        list: [{ checked: false }],
      },
      wounds: {
        amount: 5,
        list: [{ checked: false }],
      },
    },
    mental: {
      resolve: {
        amount: 20,
        list: [{ checked: false }],
      },
      injuries: {
        amount: 5,
        list: [{ checked: false }],
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
  stats: {
    dexterity: {
      value: 0,
      traditional: {
        experience: 0,
        OZ: 0,
        melee: false,
        archery: false,
        martialArts: false,
      },
      mobility: {
        experience: 0,
        OZ: 0,
        acrobatics: false,
        stealth: false,
      },
    },
    coordination: {
      value: 0,
      firearms: {
        experience: 0,
        OZ: 0,
        pistols: false,
        arquebuses: false,
        fieldsQueen: false,
      },
      seafaring: {
        experience: 0,
        OZ: 0,
        helmsman: false,
        boatswain: false,
      },
      defense: {
        experience: 0,
        OZ: 0,
        parry: false,
        cover: false,
      },
    },
    insight: {
      value: 0,
      social: {
        experience: 0,
        OZ: 0,
        persuasion: false,
        manipulation: false,
      },
      presence: {
        experience: 0,
        OZ: 0,
        leadership: false,
        animalHandling: false,
      },
      perception: {
        experience: 0,
        OZ: 0,
        awareness: false,
        insight: false,
        thievery: false,
      },
    },
    intelligence: {
      value: 0,
      craft: {
        experience: 0,
        OZ: 0,
        name: "",
        focus: false,
      },
      knowledge: {
        experience: 0,
        OZ: 0,
        civilization: 0,
        medicine: 0,
        strategy: 0,
        nature: 0,
      },
    },
    willpower: {
      value: 0,
      discipline: {
        experience: 0,
        OZ: 0,
        order: 0,
        navigation: 0,
        faith: 0,
      },
    },
    strength: {
      value: 0,
      endurance: {
        experience: 0,
        OZ: 0,
        athletics: 0,
        resistance: 0,
      },
    },
  },
};
