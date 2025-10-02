import type { DefaultFormComponentProps } from "../../../../types/default-form-section-props.type.ts";
import BaseSlot from "./BaseSlot.tsx";

export default function LeftHand({
  formHook,
  onChange,
}: DefaultFormComponentProps) {
  return (
    <BaseSlot
      propName="defence.armor.slots.leftHand"
      formHook={formHook}
      onChange={onChange}
      primaryText="Л.Рука"
      secondaryText="6-8"
    />
  );
}
