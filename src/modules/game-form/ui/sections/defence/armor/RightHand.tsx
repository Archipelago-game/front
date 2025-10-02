import type { DefaultFormComponentProps } from "../../../../types/default-form-section-props.type.ts";
import BaseSlot from "./BaseSlot.tsx";

export default function RightHand({
  formHook,
  onChange,
}: DefaultFormComponentProps) {
  return (
    <BaseSlot
      propName="defence.armor.slots.rightHand"
      formHook={formHook}
      onChange={onChange}
      primaryText="П.Рука"
      secondaryText="3-5"
    />
  );
}
