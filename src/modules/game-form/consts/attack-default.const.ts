const defaultAttackMethod = {
  name: "",
  distance: 0,
  half: 0,
  size: 0,
  damage: 0,
  loads: {
    amount: 5,
    list: [
      { checked: false },
      { checked: false },
      { checked: false },
      { checked: false },
      { checked: false },
    ],
  },
  properties: "",
};

export const defaultAttack = {
  damageBonus: {
    physical: 0,
    mental: 0,
  },
  methods: {
    amount: 2,
    list: [defaultAttackMethod, defaultAttackMethod],
  },
};
