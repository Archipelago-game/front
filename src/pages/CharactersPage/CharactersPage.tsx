import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../app/providers/auth-provider/use-auth-context.hook.ts";

import { api } from "../../api/api.ts";

import Characters from "../../modules/characters/Characters.tsx";
import { Box } from "@mui/system";

import type { CharacterDocument } from "../../api/firebase-characters-service.ts";
import { useSnackbarContext } from "../../app/providers/snackbar-provider/use-snackbar-context.hook.ts";

export default function CharactersPage() {
  const { showMessage } = useSnackbarContext();
  const navigate = useNavigate();
  const { userInfo } = useAuthContext();
  const [characterDocs, setCharacterDocs] = useState<CharacterDocument[]>([]);

  const fetchCharacters = async (userId: string) => {
    const data = await api.getCharacters(userId);
    setCharacterDocs(data);
  };

  const addCharacter = async (userId: string) => {
    const characterId = await api.addNewCharacter(userId);
    console.log("addCharacter characterId", characterId);
    navigate(`/game-form/${characterId}`);
  };

  const deleteCharacter = async (userId: string, characterId: string) => {
    await api.deleteCharacter(userId, characterId);
    await fetchCharacters(userId);
    showMessage({ message: "герой был удален" });
  };

  const openCharacterForm = async (characterId: string) => {
    navigate(`/game-form/${characterId}`);
  };

  useEffect(() => {
    if (userInfo) {
      fetchCharacters(userInfo.uid);
    }
  }, [userInfo]);

  if (!userInfo) {
    return <Box>Персонажи не найдены</Box>;
  }

  return (
    <Characters
      characters={characterDocs}
      openCharacterForm={openCharacterForm}
      addCharacter={() => addCharacter(userInfo.uid)}
      deleteCharacter={(characterId: string) =>
        deleteCharacter(userInfo.uid, characterId)
      }
    />
  );
}
