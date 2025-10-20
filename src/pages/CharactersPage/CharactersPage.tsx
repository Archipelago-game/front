import { useNavigate } from "react-router-dom";
import Characters from "../../modules/characters/Characters.tsx";
import { api } from "../../api/api.ts";
import type { FormType } from "../../modules/game-form/types/form/form.type.ts";
import { useEffect, useState } from "react";

export default function CharactersPage() {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<FormType[]>([]);

  const fetchCharacters = async () => {
    const data = await api.getCharacters();
    setCharacters(data);
  };

  const addCharacter = async () => {
    await api.addNewCharacter();
    navigate(`/game-form/${characters.length}`);
  };

  const openCharacterForm = async (index: number) => {
    navigate(`/game-form/${index}`);
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <Characters
      characters={characters}
      openCharacterForm={openCharacterForm}
      addCharacter={addCharacter}
    />
  );
}
