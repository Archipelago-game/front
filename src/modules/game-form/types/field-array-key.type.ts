import type { FormArrayFields, FormType } from "./form/form.type.ts";

export type DecrementDepth<D extends number> = D extends 5
  ? 4
  : D extends 4
    ? 3
    : D extends 3
      ? 2
      : D extends 2
        ? 1
        : D extends 1
          ? 0
          : 0;

type OnlyString<T> = Extract<T, string>;

export type UtilFieldArrayKeys<T, Depth extends number = 5> = [Depth] extends [
  0,
]
  ? never
  : {
      [K in keyof T]: T[K] extends FormArrayFields<infer U> // если это наш "массивоподобный" контейнер
        ? // 1) сам ключ массива на верхнем уровне ("luck" или "attack.methods")
          | (K & string)
            // 2) путь к list на этом уровне (если нужен вариант с ".list")
            | `${K & string}`
            // 3) рекурсия по элементу списка U, но только строковые варианты
            | `${K & string}.list.${number}.${OnlyString<UtilFieldArrayKeys<U, DecrementDepth<Depth>>>}`
        : // если это обычный объект — просто идём глубже
          T[K] extends object
          ? `${K & string}.${OnlyString<UtilFieldArrayKeys<T[K], DecrementDepth<Depth>>>}`
          : never;
    }[keyof T];

export type FieldArrayKeys = UtilFieldArrayKeys<FormType>;
