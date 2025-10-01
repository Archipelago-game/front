import type {
  AttackMethods,
  CheckBoxList,
  FormValues,
} from "./form-values.type.ts";

export type CheckBoxListKeys<T extends FormValues> = {
  [K in keyof T]: T[K] extends CheckBoxList | AttackMethods ? K : never;
}[keyof T];
