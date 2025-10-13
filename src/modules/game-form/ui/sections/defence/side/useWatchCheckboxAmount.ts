import { useEffect } from "react";
import { type FieldPath, useWatch } from "react-hook-form";

import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import type { Checkbox, FormType } from "../../../../types/form/form.type.ts";

interface Props {
  defaultAmount: number;
  amountName: FieldPath<FormType>;
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
  const { defaultAmount, amountName, listName } = props;
  const { methods } = useCustomFormContext();

  const amountRaw = useWatch({
    control: methods.control,
    name: amountName,
    defaultValue: defaultAmount,
  });

  const amountValue = Number(amountRaw);

  const list = useWatch({
    control: methods.control,
    name: listName,
    defaultValue: [],
  });

  const isDisabled = (index: number) => index > amountValue - 1;

  function resetDisabledCheckboxes(amount: number, list: Checkbox[]): void {
    for (let i = amount; i < list.length - 1; i++) {
      methods.setValue(
        `${listName}.${i}.checked` as FieldPath<FormType>,
        false,
      );
    }
  }

  useEffect(() => {
    if (isCheckboxList(list)) {
      resetDisabledCheckboxes(amountValue, list);
    }
  }, [methods, defaultAmount, amountValue, list]);

  return { isDisabled };
}
