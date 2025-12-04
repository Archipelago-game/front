import { Box, Button, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { CharacterDocument } from "../../api/firebase-characters-service.ts";
import FileDownload from "@mui/icons-material/FileDownload";

interface Props {
  characters: CharacterDocument[];
  openCharacterForm: (characterId: string) => void;
  addCharacter: () => void;
  deleteCharacter: (characterId: string) => void;
  exportCharacter: (characterId: string) => void;
  importCharacter: () => void;
}

export default function Characters({
  characters,
  openCharacterForm,
  addCharacter,
  deleteCharacter,
  exportCharacter,
  importCharacter,
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
            sx={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <IconButton
              onClick={() =>
                character.id ? deleteCharacter(character.id) : () => {}
              }
            >
              <DeleteIcon color="error" />
            </IconButton>

            <IconButton
              sx={{ position: "relative" }}
              onClick={() =>
                character.id ? exportCharacter(character.id) : () => {}
              }
            >
              <FileDownload
                color="primary"
                sx={{
                  position: "relative",
                  top: "2px",
                }}
              />
            </IconButton>

            <Button
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
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: 2,
        }}
      >
        <Button onClick={addCharacter}>Создать нового героя</Button>
        <Button onClick={importCharacter}>Загрузить героя</Button>
      </Box>
    </Box>
  );
}
