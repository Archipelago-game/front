import type { DefaultFormComponentProps } from "../../../../types/default-form-section-props.type.ts";
import BaseSlot from "./BaseSlot.tsx";

export default function RightLeg({
  formHook,
  onChange,
}: DefaultFormComponentProps) {
  return (
    <BaseSlot
      propName="defence.armor.slots.leftLeg"
      formHook={formHook}
      onChange={onChange}
      primaryText="Л.Нога"
      secondaryText="18-20"
    />
  );
}
