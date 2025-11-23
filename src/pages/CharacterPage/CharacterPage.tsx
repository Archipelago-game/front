import CharacterForm from "../../modules/game-form/CharacterForm.tsx";
import { CustomFormContextProvider } from "../../modules/game-form/providers/custom-form-context.provider.tsx";
import { FormDialogContextProvider } from "../../modules/form-dialog/FormDialogContextProvider.tsx";

export default function CharacterPage() {
  return (
    <CustomFormContextProvider>
      <FormDialogContextProvider>
        <CharacterForm />
      </FormDialogContextProvider>
    </CustomFormContextProvider>
  );
}
