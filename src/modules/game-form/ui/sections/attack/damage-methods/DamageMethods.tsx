import type { FieldArrayComponentShortProps } from "../../../../types/field-array-component-props.type.ts";
import { useSyncFieldArray } from "../../../../hooks/use-sync-field-array.hook.ts";

import DamageMethodItem from "./DamageMethodItem.tsx";
import type { FormType } from "../../../../types/form/form.type.ts";
import { Box } from "@mui/material";
import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";

interface Props extends FieldArrayComponentShortProps {
  values: FormType;
}

export default function DamageMethods(props: Props) {
  const { methods, onChange } = useCustomFormContext();
  const fields = useSyncFieldArray({
    ...props,
    formHook: methods,
    onChange,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {fields.map((_, i) => (
        <DamageMethodItem key={i} index={i} values={props.values} />
      ))}
    </Box>
  );
}
