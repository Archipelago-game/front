import type { FormArrayFields, FormType } from "./form/form.type.ts";
import type { DecrementDepth } from "./field-array-key.type.ts";

type NestedKeys<T, Depth extends number = 5> = [Depth] extends [0]
  ? never
  : {
      [K in keyof T & string]: T[K] extends FormArrayFields<infer U>
        ? `${K}` | `${K}.list.${number}.${NestedKeys<U, DecrementDepth<Depth>>}`
        : T[K] extends object
          ? `${K}` | `${K}.${NestedKeys<T[K], DecrementDepth<Depth>>}`
          : `${K}`;
    }[keyof T & string];

export type FormNestedKeys = NestedKeys<FormType>;
