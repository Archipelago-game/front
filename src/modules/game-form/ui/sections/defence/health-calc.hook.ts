import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { type FieldPath, useWatch } from "react-hook-form";
import type { FormType } from "../../../types/form/form.type.ts";

interface Props {
  statValueName: FieldPath<FormType>;
  focusFieldNames: FieldPath<FormType>[];
}

export function useHealthCalc({ statValueName, focusFieldNames }: Props) {
  const { methods } = useCustomFormContext();

  const watchedValues = useWatch({
    control: methods.control,
    name: [statValueName, ...focusFieldNames],
  });

  const [statValue, ...focusValues] = watchedValues;

  const maxFocus = focusValues.reduce((max, value) => {
    const num = Number(value) || 0;
    return Math.max(max, num);
  }, 0);

  return (Number(statValue) || 0) + maxFocus;
}
