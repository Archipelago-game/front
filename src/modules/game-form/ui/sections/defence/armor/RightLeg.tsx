import type { DefaultFormComponentProps } from "../../../../types/default-form-section-props.type.ts";
import BaseSlot from "./BaseSlot.tsx";

export default function RightLeg({
  formHook,
  onChange,
}: DefaultFormComponentProps) {
  return (
    <BaseSlot
      propName="defence.armor.slots.rightLeg"
      formHook={formHook}
      onChange={onChange}
      primaryText="П.Нога"
      secondaryText="15-17"
    />
  );
}
