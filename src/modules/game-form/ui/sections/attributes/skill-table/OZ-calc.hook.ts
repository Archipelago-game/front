import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import { type FieldPath, useWatch } from "react-hook-form";
import type { FormType } from "../../../../types/form/form.type.ts";

interface Props {
  statValueName: FieldPath<FormType>;
  expertiseFieldName: FieldPath<FormType>;
}

export function useOZCalc({ statValueName, expertiseFieldName }: Props) {
  const { methods } = useCustomFormContext();

  const [statValue, expertiseValue] = useWatch({
    control: methods.control,
    name: [statValueName, expertiseFieldName],
  });

  const value = (Number(statValue) || 0) + (Number(expertiseValue) || 0);

  return { value };
}
