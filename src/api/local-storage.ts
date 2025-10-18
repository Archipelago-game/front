import { FORM_DEFAULT_VALUES } from "../modules/game-form/consts/form-default-values.const.ts";
import type { FormType } from "../modules/game-form/types/form/form.type.ts";
import type { Character } from "./character-types";
import type { LocalCharacter, CharactersStorage } from "./types";

const CHARACTERS_STORAGE_KEY = "ARCHIPELAGO_CHARACTERS";
const CURRENT_CHARACTER_KEY = "ARCHIPELAGO_CURRENT_CHARACTER";

/**
 * Получить текущего персонажа (для обратной совместимости)
 * @deprecated Используйте getCurrentCharacter() вместо этого
 */
export function getLocalStorage(): FormType {
  const currentCharacter = getCurrentCharacter();
  return currentCharacter?.characterData || FORM_DEFAULT_VALUES;
}

/**
 * Сохранить данные текущего персонажа (для обратной совместимости)
 * @deprecated Используйте saveCurrentCharacter() вместо этого
 */
export function setLocalStorage(data: FormType) {
  const currentCharacter = getCurrentCharacter();
  if (currentCharacter) {
    updateCharacter(currentCharacter.id, { characterData: data });
  } else {
    // Создаем нового персонажа с данными
    const newCharacter: LocalCharacter = {
      id: generateLocalId(),
      name: data.name || "Новый персонаж",
      characterData: data,
      lastModified: new Date(),
      version: 1,
      isLocal: true,
    };
    addCharacter(newCharacter);
    setCurrentCharacterId(newCharacter.id);
  }
}

/**
 * Получить всех персонажей из localStorage
 */
export function getAllCharacters(): LocalCharacter[] {
  const data = localStorage.getItem(CHARACTERS_STORAGE_KEY);
  if (data) {
    const storage: CharactersStorage = JSON.parse(data);
    return storage.characters.map((char) => ({
      ...char,
      lastModified: new Date(char.lastModified),
    }));
  }
  return [];
}

/**
 * Получить персонажа по ID
 */
export function getCharacterById(id: string): LocalCharacter | null {
  const characters = getAllCharacters();
  return characters.find((char) => char.id === id) || null;
}

/**
 * Получить текущего активного персонажа
 */
export function getCurrentCharacter(): LocalCharacter | null {
  const currentId = getCurrentCharacterId();
  if (!currentId) return null;
  return getCharacterById(currentId);
}

/**
 * Получить ID текущего персонажа
 */
export function getCurrentCharacterId(): string | null {
  return localStorage.getItem(CURRENT_CHARACTER_KEY);
}

/**
 * Установить текущего персонажа
 */
export function setCurrentCharacterId(characterId: string): void {
  localStorage.setItem(CURRENT_CHARACTER_KEY, characterId);
}

/**
 * Добавить нового персонажа
 */
export function addCharacter(character: LocalCharacter): void {
  const characters = getAllCharacters();
  characters.push(character);
  saveAllCharacters(characters);
}

/**
 * Обновить персонажа
 */
export function updateCharacter(
  id: string,
  updates: Partial<LocalCharacter>,
): void {
  const characters = getAllCharacters();
  const index = characters.findIndex((char) => char.id === id);
  if (index !== -1) {
    characters[index] = {
      ...characters[index],
      ...updates,
      lastModified: new Date(),
      version: characters[index].version + 1,
    };
    saveAllCharacters(characters);
  }
}

/**
 * Удалить персонажа
 */
export function deleteCharacter(id: string): void {
  const characters = getAllCharacters();
  const filteredCharacters = characters.filter((char) => char.id !== id);
  saveAllCharacters(filteredCharacters);

  // Если удаляем текущего персонажа, выбираем первого доступного
  const currentId = getCurrentCharacterId();
  if (currentId === id) {
    if (filteredCharacters.length > 0) {
      setCurrentCharacterId(filteredCharacters[0].id);
    } else {
      localStorage.removeItem(CURRENT_CHARACTER_KEY);
    }
  }
}

/**
 * Создать нового персонажа
 */
export function createCharacter(
  name: string,
  characterData: FormType = FORM_DEFAULT_VALUES,
): LocalCharacter {
  const newCharacter: LocalCharacter = {
    id: generateLocalId(),
    name,
    characterData,
    lastModified: new Date(),
    version: 1,
    isLocal: true,
  };

  addCharacter(newCharacter);
  return newCharacter;
}

/**
 * Синхронизировать персонажа с Backendless
 */
export function syncCharacterWithBackend(
  localId: string,
  backendCharacter: Character,
): void {
  const characters = getAllCharacters();
  const index = characters.findIndex((char) => char.id === localId);
  if (index !== -1) {
    characters[index] = {
      ...characters[index],
      backendId: backendCharacter.objectId,
      isLocal: false,
      version: backendCharacter.version,
      lastModified: new Date(backendCharacter.lastModified),
    };
    saveAllCharacters(characters);
  }
}

/**
 * Отметить персонажа как локальный (после неудачной синхронизации)
 */
export function markCharacterAsLocal(localId: string): void {
  const characters = getAllCharacters();
  const index = characters.findIndex((char) => char.id === localId);
  if (index !== -1) {
    characters[index] = {
      ...characters[index],
      isLocal: true,
      lastModified: new Date(),
    };
    saveAllCharacters(characters);
  }
}

/**
 * Получить время последней синхронизации
 */
export function getLastSyncTime(): Date | null {
  const data = localStorage.getItem(CHARACTERS_STORAGE_KEY);
  if (data) {
    const storage: CharactersStorage = JSON.parse(data);
    return storage.lastSync ? new Date(storage.lastSync) : null;
  }
  return null;
}

/**
 * Установить время последней синхронизации
 */
export function setLastSyncTime(date: Date): void {
  const data = localStorage.getItem(CHARACTERS_STORAGE_KEY);
  const storage: CharactersStorage = data
    ? JSON.parse(data)
    : { characters: [] };
  storage.lastSync = date;
  localStorage.setItem(CHARACTERS_STORAGE_KEY, JSON.stringify(storage));
}

/**
 * Сохранить всех персонажей в localStorage
 */
function saveAllCharacters(characters: LocalCharacter[]): void {
  const data = localStorage.getItem(CHARACTERS_STORAGE_KEY);
  const storage: CharactersStorage = data
    ? JSON.parse(data)
    : { characters: [] };
  storage.characters = characters;
  localStorage.setItem(CHARACTERS_STORAGE_KEY, JSON.stringify(storage));
}

/**
 * Генерировать уникальный локальный ID
 */
function generateLocalId(): string {
  return `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Очистить все данные персонажей (для отладки)
 */
export function clearAllCharacters(): void {
  localStorage.removeItem(CHARACTERS_STORAGE_KEY);
  localStorage.removeItem(CURRENT_CHARACTER_KEY);
}
