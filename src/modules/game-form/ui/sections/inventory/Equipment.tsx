import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { useFieldArray } from "react-hook-form";
import { useEffect } from "react";

import { Box, Button, IconButton, Stack } from "@mui/material";

import { buttonDeleteStyles } from "../../../../../common/styles/button-delete-styles.css.ts";
import { Delete } from "@mui/icons-material";
import { useConfirmDialogContext } from "../../../../confirm-dialog/use-confirm-dialog.hook.ts";

import TextFieldControllerNew from "../../components/controllers/TextFieldControllerNew.tsx";

import CustomTextFieldLabel from "../../components/fields/custom-text-field/CustomTextFieldLabel.tsx";

export default function Equipment() {
  const { methods, values, onChange } = useCustomFormContext();
  const { open } = useConfirmDialogContext();

  const { fields, replace, append, remove } = useFieldArray({
    name: `inventory.equipment.list`,
    control: methods.control,
  });

  const addEquipment = () => {
    append({ value: "" });
  };

  const deleteEquipment = (index: number, name: string) => {
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
      replace(values.inventory.equipment.list);
    }
  }, [values?.inventory.equipment.list, replace]);

  return (
    <Box>
      <CustomTextFieldLabel title="Личные вещи" />
      <Stack rowGap="4px">
        {fields.map((field, index) => (
          <Stack key={field.id} direction="row" columnGap={1}>
            <TextFieldControllerNew
              fieldName={`inventory.equipment.list.${index}.value`}
              fieldType="text"
            />
            <IconButton
              onClick={() => deleteEquipment(index, field.value)}
              sx={{ padding: 0, margin: "0 auto", ...buttonDeleteStyles }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Stack>
        ))}
      </Stack>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={addEquipment}>Добавить</Button>
      </Box>
    </Box>
  );
}
