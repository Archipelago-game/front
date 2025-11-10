import { FORM_DEFAULT_VALUES } from "../modules/game-form/consts/form-default-values.const.ts";
import type { FormType } from "../modules/game-form/types/form/form.type.ts";

const STORAGE_KEY = "ARCHIPELAGO";

export const LocalStoragePatch = {
  convertObjToArray() {
    const data = CharactersUtils.getCharacters();
    if (!data) {
      return;
    }

    if (!Array.isArray(data)) {
      CharactersUtils.setCharacters([data]);
    }
  },
};

export const CharactersUtils = {
  getCharacters() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data) as FormType[];
    }

    return [];
  },

  getCharacterForm(index: number) {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data) as FormType[];
      if (parsed.length >= index) {
        return parsed[index];
      }
    }

    return FORM_DEFAULT_VALUES;
  },

  setCharacters(data: FormType[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  setCharacterForm(index: number, data: FormType) {
    const characters = this.getCharacters();
    const newCharacters = characters.toSpliced(index, 1, data);
    this.setCharacters(newCharacters);
  },

  setNewCharacterForm() {
    const characters = this.getCharacters();
    characters.push(FORM_DEFAULT_VALUES);
    this.setCharacters(characters);
  },
};
