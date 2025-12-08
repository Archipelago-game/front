import { useEffect } from "react";
import { type FieldPath, useWatch } from "react-hook-form";

import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import type { Checkbox, FormType } from "../../../../types/form/form.type.ts";

interface Props {
  amount: number;
  listName: FieldPath<FormType>;
}

function isCheckboxList(value: unknown): value is Checkbox[] {
  if (!Array.isArray(value)) {
    return false;
  }
  return value.every(
    (item) => typeof item === "object" && item !== null && "checked" in item,
  );
}

export function useWatchCheckboxAmount(props: Props) {
  const { amount, listName } = props;
  const { methods } = useCustomFormContext();

  const list = useWatch({
    control: methods.control,
    name: listName,
    defaultValue: [],
  });

  const isDisabled = (i: number) => i > amount - 1;

  function resetDisabledCheckboxes(amount: number, list: Checkbox[]): void {
    for (let i = amount; i < list.length - 1; i++) {
      const path = `${listName}.${i}.checked` as FieldPath<FormType>;
      const currentValue = methods.getValues(path);
      if (currentValue !== "checked") {
        methods.setValue(path, false);
      }
    }
  }

  useEffect(() => {
    if (isCheckboxList(list)) {
      resetDisabledCheckboxes(amount, list);
    }
  }, [amount]);

  return isDisabled;
}
