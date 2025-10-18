import type { FormType } from "../modules/game-form/types/form/form.type";

// Интерфейс для локального персонажа
export interface LocalCharacter {
  id: string;
  name: string;
  characterData: FormType;
  lastModified: Date;
  version: number;
  isLocal: boolean; // true если персонаж существует только локально
  backendId?: string; // ID в Backendless, если персонаж синхронизирован
}

// Интерфейс для результата синхронизации
export interface SyncResult {
  success: boolean;
  syncedCount: number;
  conflicts: ConflictInfo[];
  errors: string[];
}

// Интерфейс для информации о конфликте
export interface ConflictInfo {
  characterId: string;
  characterName: string;
  localVersion: number;
  remoteVersion: number;
  localModified: Date;
  remoteModified: Date;
  resolution: "local" | "remote" | "manual";
}

// Интерфейс для хранения всех персонажей в localStorage
export interface CharactersStorage {
  characters: LocalCharacter[];
  lastSync?: Date;
}

// Статусы персонажа
export type CharacterStatus = "active" | "archived" | "deleted";

// Операции синхронизации
export type SyncOperation = "create" | "update" | "delete" | "conflict";

// Результат операции синхронизации
export interface SyncOperationResult {
  operation: SyncOperation;
  characterId: string;
  success: boolean;
  error?: string;
}
