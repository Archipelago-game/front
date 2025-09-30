import type { FormValues } from "../modules/game-form/types/form-values.type.ts";
import { FORM_DEFAULT_VALUES } from "../modules/game-form/consts/form-default-values.const.ts";

export const api = {
  async getOne(): Promise<FormValues> {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(FORM_DEFAULT_VALUES);
      }, 1000);
    });
  },

  async save(data: FormValues) {
    console.log(data);
  },
};
