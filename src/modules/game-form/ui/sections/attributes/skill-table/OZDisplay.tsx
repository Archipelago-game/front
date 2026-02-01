import { useOZCalc, type AttributeType } from "./OZ-calc.hook.ts";

import CalculatedValue from "../../../components/CalculatedValue.tsx";
import { type FieldPath } from "react-hook-form";
import type { FormType } from "../../../../types/form/form.type.ts";

interface Props {
  statValueName: FieldPath<FormType>;
  expertiseFieldName: FieldPath<FormType>;
  attributeType: AttributeType;
}

export default function OZDisplay(props: Props) {
  const { value, isReduced } = useOZCalc(props);

  return <CalculatedValue value={value} isReduced={isReduced} />;
}
