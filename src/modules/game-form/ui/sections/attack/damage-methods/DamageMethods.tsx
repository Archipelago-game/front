import type { FieldArrayComponentProps } from "../../../../types/field-array-component-props.type.ts";
import { useSyncFieldArray } from "../../../../hooks/use-sync-field-array.hook.ts";

export default function DamageMethods(props: FieldArrayComponentProps) {
  const fields = useSyncFieldArray(props);

  return (
    <div>
      <div>test</div>
    </div>
  );
}
