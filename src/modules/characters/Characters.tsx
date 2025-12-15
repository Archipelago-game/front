import {
  Box,
  Button,
  IconButton,
  Input,
  Typography,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { CharacterDocument } from "../../services/character/firebase-characters-service.ts";
import FileDownload from "@mui/icons-material/FileDownload";
import { buttonDeleteStyles } from "../../common/styles/button-delete-styles.css.ts";

interface Props {
  characters: CharacterDocument[];
  openCharacterForm: (characterId: string) => void;
  addCharacter: () => void;
  deleteCharacter: (characterId: string) => void;
  exportCharacter: (characterId: string) => void;
  importCharacter: (file?: File) => void;
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

      <Box component="ul" sx={{ listStyle: "none", padding: 0, mt: 2 }}>
        {characters.map((character, index) => (
          <Paper
            component="li"
            key={character.id || `character-${index}`}
            sx={{
              mb: 2,
              p: 2,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "stretch", md: "center" },
              gap: 2,
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: "action.hover",
                transform: "translateX(4px)",
              },
            }}
            onClick={() =>
              character.id ? openCharacterForm(character.id) : undefined
            }
          >
            {/* Основная информация */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" component="div">
                {character.data.name === ""
                  ? "Безымянный герой"
                  : character.data.name}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 1,
                  flexWrap: "wrap",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Возраст: {character.data.age}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Родина: {character.data.homeland || "Неизвестно"}
                </Typography>
              </Box>
            </Box>

            {/* Характеристики */}
            <Box
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "center",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="caption" color="text.secondary">
                  Сила
                </Typography>
                <Typography variant="h6">
                  {character.data.stats?.strength?.value ?? 0}
                </Typography>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Typography variant="caption" color="text.secondary">
                  Воля
                </Typography>
                <Typography variant="h6">
                  {character.data.stats?.willpower?.value ?? 0}
                </Typography>
              </Box>
            </Box>

            {/* Действия */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: { xs: "flex-end", md: "center" },
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <IconButton
                size="small"
                onClick={() =>
                  character.id ? exportCharacter(character.id) : undefined
                }
                aria-label="Экспорт персонажа"
              >
                <FileDownload />
              </IconButton>

              <IconButton
                size="small"
                onClick={() =>
                  character.id ? deleteCharacter(character.id) : undefined
                }
                sx={buttonDeleteStyles}
                aria-label="Удалить персонажа"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Paper>
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

        <Button component="label">
          Загрузить героя
          <Input
            type="file"
            sx={{ display: "none" }}
            onChange={(e) => {
              console.log("from characters");
              const file = (e.target as HTMLInputElement).files?.[0];
              importCharacter(file);
            }}
          />
        </Button>
      </Box>
    </Box>
  );
}
