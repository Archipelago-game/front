import CalculatedValue from "../../../components/CalculatedValue.tsx";
import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import { type FieldPath, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import type { FormType } from "../../../../types/form/form.type.ts";

interface Props {
  statValueName: FieldPath<FormType>;
  expertiseFieldName: FieldPath<FormType>;
}

export default function OZDisplay(props: Props) {
  const [value, setValue] = useState(0);
  const { methods } = useCustomFormContext();

  const statValue = useWatch({
    control: methods.control,
    name: props.statValueName,
  });
  const expertise = useWatch({
    control: methods.control,
    name: props.expertiseFieldName,
  });

  useEffect(() => {
    const result = (Number(statValue) || 0) + (Number(expertise) || 0);

    setValue(result);
  }, [statValue, expertise]);

  return <CalculatedValue value={value} />;
}
