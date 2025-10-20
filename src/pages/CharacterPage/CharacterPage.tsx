import CharacterForm from "../../modules/game-form/CharacterForm.tsx";
import { CustomFormContextProvider } from "../../modules/game-form/providers/custom-form-context.provider.tsx";

export default function CharacterPage() {
  return (
    <CustomFormContextProvider>
      <CharacterForm />
    </CustomFormContextProvider>
  );
}
