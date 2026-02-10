import { Box } from "@mui/material";

import CustomTextFieldLabel from "../../components/fields/custom-text-field/CustomTextFieldLabel.tsx";
import TextFieldControllerNew from "../../components/controllers/TextFieldControllerNew.tsx";
import { useTheme } from "@mui/material/styles";

import RaceController from "./RaceController.tsx";

export default function FormBaseInfo() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        columnGap: "4px",
        rowGap: 1,
        backgroundColor: theme.palette.base.surfaceAccent,
        padding: 2,
        borderRadius: 1,
      }}
    >
      <CustomTextFieldLabel title="Имя" />
      <TextFieldControllerNew fieldName="name" fieldType="text" />

      <CustomTextFieldLabel title="Возраст" />
      <TextFieldControllerNew fieldName="age" />

      <CustomTextFieldLabel title="Родина" />
      <TextFieldControllerNew fieldName="homeland" fieldType="text" />

      <CustomTextFieldLabel title="Язык" />
      <TextFieldControllerNew fieldName="languages" fieldType="text" />

      <CustomTextFieldLabel title="Раса" />
      <RaceController />
    </Box>
  );
}
