import GameForm from "../../modules/game-form/GameForm.tsx";
import { CustomFormContextProvider } from "../../modules/game-form/providers/custom-form-context.provider.tsx";

export default function GameFormPage() {
  return (
    <CustomFormContextProvider>
      <GameForm />
    </CustomFormContextProvider>
  );
}
