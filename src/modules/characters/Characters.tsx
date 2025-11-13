import { Box, Button, Typography } from "@mui/material";
import type { CharacterDocument } from "../../api/firebase-characters-service.ts";

interface Props {
  characters: CharacterDocument[];
  openCharacterForm: (characterId: string) => void;
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
            key={`${index}${character.data.name}${character.data.age}${index}`}
          >
            {/* todo переделать по-человечески */}
            <Button
              disabled={!!character.id}
              onClick={() =>
                character.id ? openCharacterForm(character.id) : () => {}
              }
            >
              {character.data.name === ""
                ? "Безымянный герой"
                : character.data.name}
            </Button>
          </Box>
        ))}
        <Button onClick={addCharacter}>Создать нового героя</Button>
      </Box>
    </Box>
  );
}
