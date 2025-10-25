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
    const newIndex = await api.addNewCharacter();
    navigate(`/game-form/${newIndex}`);
  };

  const openCharacterForm = async (index: number) => {
    navigate(`/game-form/${index}`);
  };

  useEffect(() => {
    // Подписываемся на изменения персонажей в реальном времени
    const unsubscribe = api.subscribeToCharacters((updatedCharacters) => {
      setCharacters(updatedCharacters);
    });

    // Также загружаем данные при первом рендере
    fetchCharacters();

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  return (
    <Characters
      characters={characters}
      openCharacterForm={openCharacterForm}
      addCharacter={addCharacter}
    />
  );
}
