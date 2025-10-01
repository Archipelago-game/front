import type { DefaultFormSectionProps } from "../../../types/default-form-section.props.ts";
import CustomLabel from "../../components/CustomLabel.tsx";
import CheckboxList from "../../components/CheckboxList.tsx";
import type { FormValues } from "../../../types/form-values.type.ts";
import { Box } from "@mui/material";

interface Props extends DefaultFormSectionProps {
  values: FormValues;
}

export default function Luck({ formHook, onChange, values }: Props) {
  return (
    <>
      <CustomLabel label={{ text: "Удача/Решимость" }} sx={{ flex: "1 1 1" }}>
        <Box>
          <CheckboxList
            formHook={formHook}
            onChange={onChange}
            name="luck"
            amount={values.luck.amount}
            size="large"
          />
        </Box>
      </CustomLabel>
    </>
  );
}
