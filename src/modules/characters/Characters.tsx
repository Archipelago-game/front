import { Box, Button, Typography } from "@mui/material";
import type { FormType } from "../game-form/types/form/form.type.ts";

interface Props {
  characters: FormType[];
  openCharacterForm: (index: string) => void;
  addCharacter: () => void;
}
export default function Characters({
  characters,
  openCharacterForm,
  addCharacter,
}: Props) {
  return (
    <Box>
      <Typography variant="h2" fontSize={"1.8em"}>
        Герои
      </Typography>

      <Box component="ul">
        {characters.map((character, index) => (
          <Box
            component="li"
            key={`${index}${character.name}${character.age}${index}`}
          >
            <Button onClick={() => openCharacterForm(index)}>
              {character.name === "" ? "Безымянный герой" : character.name}
            </Button>
          </Box>
        ))}
        <Button onClick={addCharacter}>Создать нового героя</Button>
      </Box>
    </Box>
  );
}
