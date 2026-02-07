import { Box, Button } from "@mui/material";
import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import { useFieldArray } from "react-hook-form";
import { defaultAttackMethod } from "../../../../consts/attack-default.const.ts";
import { useConfirmDialogContext } from "../../../../../confirm-dialog/use-confirm-dialog.hook.ts";

import { useEffect } from "react";
import DamageMethodItemNew from "./DamageMethodsItemNew.tsx";

export default function DamageMethodsNew() {
  const { methods, values, onChange } = useCustomFormContext();
  const { open } = useConfirmDialogContext();

  const { fields, append, remove, replace } = useFieldArray({
    name: "attack.methods.list",
    control: methods.control,
  });

  const addItem = () => {
    append(defaultAttackMethod);
    onChange();
  };

  const deleteItem = (index: number, name: string) => {
    open({
      message: `ты действительно хочешь удалить  ${name}?`,
      onConfirm: () => {
        remove(index);
        onChange();
      },
    });
  };

  useEffect(() => {
    if (values) {
      replace(values.attack.methods.list);
    }
  }, [values?.attack.methods.list, replace]);

  if (values === null) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {fields.map((field, index) => (
        <DamageMethodItemNew
          index={index}
          onDelete={() => deleteItem(index, field.name)}
        />
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={addItem}>Добавить</Button>
      </Box>
    </Box>
  );
}
