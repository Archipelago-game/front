import { Box, IconButton, Stack } from "@mui/material";

import type { AttackMethod } from "../../../../types/form/form.type.ts";
import Loads from "./Loads.tsx";

import { buttonDeleteStyles } from "../../../../../../common/styles/button-delete-styles.css.ts";
import { Delete } from "@mui/icons-material";
import CustomTextField from "../../../components/fields/custom-text-field/CustomTextField.tsx";
import SubSection from "../../../components/section/SubSection.tsx";

interface Props {
  index: number;
  onDelete: () => void;
}

interface FieldConfig {
  label: string;
  key: keyof Omit<AttackMethod, "loads" | "properties">;
}

const fieldConfigList: FieldConfig[] = [
  {
    label: "1/2р",
    key: "half",
  },
  {
    label: "Размер",
    key: "size",
  },
  {
    label: "Урон",
    key: "damage",
  },
];

export default function DamageMethodItemNew({ index, onDelete }: Props) {
  return (
    <SubSection key={index}>
      <Stack spacing={1}>
        <Stack direction="row" spacing={3}>
          <Box sx={{ flexGrow: 1, maxWidth: "calc(100% - 30px)" }}>
            <CustomTextField
              textField={{
                fieldName: `attack.methods.list.${index}.name`,
                fieldType: "text",
              }}
              title="Название"
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: 5,
              right: 5,
            }}
          >
            <IconButton
              onClick={onDelete}
              sx={{ padding: 0, margin: "0 auto", ...buttonDeleteStyles }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Stack>

        <Box
          display="flex"
          sx={{
            columnGap: 3,
            rowGap: 1,
            flexWrap: "wrap",
          }}
        >
          {fieldConfigList.map((fieldConfig) => (
            <CustomTextField
              key={fieldConfig.key}
              title={fieldConfig.label}
              textField={{
                fieldName: `attack.methods.list.${index}.${fieldConfig.key}`,
              }}
            />
          ))}
          <Loads
            index={index}
            name={`attack.methods.list.${index}.loads`}
            amount={5}
            defaultValue={{ checked: false }}
          />
        </Box>
      </Stack>
    </SubSection>
  );
}
