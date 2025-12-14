import DamageMethodItem from "./DamageMethodItem.tsx";

import { Box, Button, IconButton } from "@mui/material";
import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import { useFieldArray } from "react-hook-form";
import { defaultAttackMethod } from "../../../../consts/attack-default.const.ts";
import { useConfirmDialogContext } from "../../../../../confirm-dialog/use-confirm-dialog.hook.ts";
import { buttonDeleteStyles } from "../../../../../../common/styles/button-delete-styles.css.ts";
import { Delete } from "@mui/icons-material";
import { useEffect } from "react";

export default function DamageMethods() {
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
        <Box
          key={index}
          sx={{
            position: "relative",
            paddingLeft: "25px",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -2,
              left: 1,
            }}
          >
            <IconButton
              onClick={() => deleteItem(index, field.name)}
              sx={{ padding: 0, margin: "0 auto", ...buttonDeleteStyles }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>

          <DamageMethodItem index={index} values={values} />
        </Box>
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
