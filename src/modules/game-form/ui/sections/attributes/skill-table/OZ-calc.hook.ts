import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import { type FieldPath, useWatch } from "react-hook-form";
import type { FormType } from "../../../../types/form/form.type.ts";
import { type Wound, type Injures } from "../../../../types/form/form.type.ts";

export type AttributeType = "physical" | "mental";

export interface OZCalculation {
  value: number;
  isReduced: boolean;
}

interface Props {
  statValueName: FieldPath<FormType>;
  expertiseFieldName: FieldPath<FormType>;
  attributeType: AttributeType;
}

/**
 * Подсчитывает количество полностью открытых ран или травм
 * @param list - список ран или травм
 * @returns количество в состоянии "full"
 */
function countActiveWounds(list: Wound[] | Injures[]): number {
  if (!list) return 0;
  return list.filter((item) => item.value === "full").length;
}

export function useOZCalc({
  statValueName,
  expertiseFieldName,
  attributeType,
}: Props): OZCalculation {
  const { methods } = useCustomFormContext();

  // Следим за значением атрибута, экспертизой и ранами/травмами
  const [statValue, expertiseValue, wounds, injuries] = useWatch({
    control: methods.control,
    name: [
      statValueName,
      expertiseFieldName,
      "defence.physical.wounds.list",
      "defence.mental.injuries.list",
    ],
  });

  // Базовое O.З. = Атрибут + Экспертиза
  const baseOZ = (Number(statValue) || 0) + (Number(expertiseValue) || 0);

  // Подсчитываем штраф в зависимости от типа характеристики
  let penalty = 0;

  if (attributeType === "physical") {
    // Физические характеристики страдают от физических ран
    penalty = countActiveWounds(wounds as Wound[]);
  } else if (attributeType === "mental") {
    // Ментальные характеристики страдают от ментальных травм
    penalty = countActiveWounds(injuries as Injures[]);
  }

  // Итоговое O.З. = Базовое O.З. - Штраф
  const finalOZ = baseOZ - penalty;

  return {
    value: finalOZ,
    isReduced: penalty > 0,
  };
}
