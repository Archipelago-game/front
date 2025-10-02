import type { DefaultFormComponentProps } from "../../../../types/default-form-section-props.type.ts";
import BaseSlot from "./BaseSlot.tsx";

export default function Body({
  formHook,
  onChange,
}: DefaultFormComponentProps) {
  return (
    <BaseSlot
      propName="defence.armor.slots.body"
      formHook={formHook}
      onChange={onChange}
      primaryText="Торс"
      secondaryText="9-14"
    />
  );
}
