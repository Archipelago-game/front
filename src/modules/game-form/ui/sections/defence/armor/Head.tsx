import type { DefaultFormComponentProps } from "../../../../types/default-form-section-props.type.ts";
import BaseSlot from "./BaseSlot.tsx";

export default function Head({
  formHook,
  onChange,
}: DefaultFormComponentProps) {
  return (
    <BaseSlot
      propName="defence.armor.slots.head"
      formHook={formHook}
      onChange={onChange}
      primaryText="Голова"
      secondaryText="1-2"
    />
  );
}
