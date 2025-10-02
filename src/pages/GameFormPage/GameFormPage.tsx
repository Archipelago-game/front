import GameForm from "../../modules/game-form/GameForm.tsx";
import { FormContextProvider } from "../../modules/game-form/providers/form-context.provider.tsx";

export default function GameFormPage() {
  return (
    <FormContextProvider>
      <GameForm />
    </FormContextProvider>
  );
}
