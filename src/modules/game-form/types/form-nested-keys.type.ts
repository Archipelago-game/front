import type { FormArrayFields, FormType } from "./form/form.type.ts";

// утилиты, если их ещё нет в файле
type DecrementDepth<N extends number> = N extends 5
  ? 4
  : N extends 4
    ? 3
    : N extends 3
      ? 2
      : N extends 2
        ? 1
        : N extends 1
          ? 0
          : 0;

// основной тип
type NestedKeys<T, Depth extends number = 5> = [Depth] extends [0]
  ? never
  : {
      [K in keyof T & string]: T[K] extends FormArrayFields<infer U> // 1) особая обработка "массивоподобных" контейнеров
        ?
            | `${K}` // ключ уровня контейнера
            | `${K}.amount` // amount
            | `${K}.list` // сам list
            | `${K}.list.${number}` // элемент списка
            | `${K}.list.${number}.${NestedKeys<U, DecrementDepth<Depth>>}`
        : // 2) если это Record<string, V> (включая Record<'craft1'|'craft2', V>)
          T[K] extends Record<string, infer V>
          ? // берем все ключи из Record (если они известны — получим литералы,
            // если это индексная сигнатура — получим `string`)
            | `${K}`
              | `${K}.${Extract<keyof T[K], string>}` // e.g. "skills.craft1" или "skills.<string>"
              // рекурсивный проход: для каждого ключа L в keyof T[K] получим
              // `${K}.${L}.${...nested}`
              | `${K}.${Extract<keyof T[K], string>}.${NestedKeys<T[K][Extract<keyof T[K], string>], DecrementDepth<Depth>>}`
          : // 3) обычный объект — рекурсивно спускаемся
            T[K] extends object
            ? `${K}` | `${K}.${NestedKeys<T[K], DecrementDepth<Depth>>}`
            : // 4) примитив — просто ключ
              `${K}`;
    }[keyof T & string];

// пример экспорта

export type FormNestedKeys = NestedKeys<FormType>;
