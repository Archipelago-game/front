import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import CustomLabel from "../../components/CustomLabel.tsx";
import { Box, Button, IconButton } from "@mui/material";

import TextFieldController from "../../components/controllers/TextFieldController.tsx";
import { buttonDeleteStyles } from "../../../../../common/styles/button-delete-styles.css.ts";
import { Delete } from "@mui/icons-material";
import { useConfirmDialogContext } from "../../../../confirm-dialog/use-confirm-dialog.hook.ts";

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
      <CustomLabel
        label={{
          text: "Личные вещи",
          color: "primary",
          size: "h6",
        }}
        orientation="column"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "4px",
          }}
        >
          {fields.map((field, index) => (
            <Box
              key={field.id}
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
                  onClick={() => deleteEquipment(index, field.value)}
                  sx={{ padding: 0, margin: "0 auto", ...buttonDeleteStyles }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
              <TextFieldController
                fieldName={`inventory.equipment.list.${index}.value`}
                fieldType="text"
              />
            </Box>
          ))}
        </Box>
      </CustomLabel>
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
