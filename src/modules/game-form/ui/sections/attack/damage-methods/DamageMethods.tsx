import type { FieldArrayComponentProps } from "../../../../types/field-array-component-props.type.ts";
import { useSyncFieldArray } from "../../../../hooks/use-sync-field-array.hook.ts";

import DamageMethodItem from "./DamageMethodItem.tsx";
import type { FormType } from "../../../../types/form.type.ts";
import { Box } from "@mui/material";

interface Props extends FieldArrayComponentProps {
  values: FormType;
}

export default function DamageMethods(props: Props) {
  const fields = useSyncFieldArray(props);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {fields.map((_, i) => (
        <DamageMethodItem
          key={i}
          index={i}
          formHook={props.formHook}
          onChange={props.onChange}
          values={props.values}
        />
      ))}
    </Box>
  );
}
