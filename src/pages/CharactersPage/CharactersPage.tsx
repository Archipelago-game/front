import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../app/providers/auth-provider/use-auth-context.hook.ts";

import { api } from "../../api/api.ts";

import Characters from "../../modules/characters/Characters.tsx";
import { Box } from "@mui/system";

import type { CharacterDocument } from "../../api/firebase-characters-service.ts";

export default function CharactersPage() {
  const navigate = useNavigate();
  const { userInfo } = useAuthContext();
  const [characterDocs, setCharacterDocs] = useState<CharacterDocument[]>([]);

  const fetchCharacters = async (userId: string) => {
    const data = await api.getCharacters(userId);
    setCharacterDocs(data);
  };

  const addCharacter = async (userId: string) => {
    await api.addNewCharacter(userId);
    await fetchCharacters(userId);
    const newCharacter = characterDocs[characterDocs.length - 1];
    navigate(`/game-form/${newCharacter.id}`);
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
    />
  );
}
