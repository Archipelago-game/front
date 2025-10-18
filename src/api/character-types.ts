import type { FormType } from "../modules/game-form/types/form/form.type.ts";

// Основной интерфейс персонажа для Backendless
export interface Character {
  objectId?: string;
  ownerId: string;
  name: string;
  characterData: FormType;
  created?: Date;
  updated?: Date;
  lastModified: Date;
  version: number;
  isDeleted: boolean;
  gameSystem: string;
  characterStatus: "active" | "archived" | "deleted";
}
