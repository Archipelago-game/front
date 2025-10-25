import { useState, useEffect } from "react";
import { FirebaseCharactersService } from "../../api/firebase-characters-service";
import type { FormType } from "../../modules/game-form/types/form/form.type";

interface ConflictData {
  index: number;
  local: FormType;
  remote: FormType;
}

export function useConflictResolution() {
  const [conflicts, setConflicts] = useState<ConflictData[]>([]);
  const [hasConflicts, setHasConflicts] = useState(false);

  useEffect(() => {
    // Проверяем наличие конфликтов при загрузке
    const pendingConflicts = FirebaseCharactersService.getPendingConflicts();
    if (pendingConflicts.length > 0) {
      setConflicts(pendingConflicts);
      setHasConflicts(true);
    }
  }, []);

  const resolveConflicts = async (
    resolutions: Array<{
      index: number;
      resolution: "local" | "remote" | "merge";
    }>,
  ) => {
    try {
      // Применяем разрешения конфликтов
      for (const resolution of resolutions) {
        const conflict = conflicts.find((c) => c.index === resolution.index);
        if (conflict) {
          let resolvedData: FormType;

          switch (resolution.resolution) {
            case "local":
              resolvedData = conflict.local;
              break;
            case "remote":
              resolvedData = conflict.remote;
              break;
            case "merge":
              // Используем функцию слияния из сервиса
              resolvedData = FirebaseCharactersService.mergeCharacterData(
                conflict.local,
                conflict.remote,
                "merge",
              );
              break;
            default:
              resolvedData = conflict.remote;
          }

          // Сохраняем разрешенные данные
          // Здесь нужно будет обновить данные в Firebase и localStorage
          console.log(
            `Разрешен конфликт для персонажа ${resolution.index}:`,
            resolvedData,
          );
        }
      }

      // Очищаем конфликты
      FirebaseCharactersService.clearPendingConflicts();
      setConflicts([]);
      setHasConflicts(false);
    } catch (error) {
      console.error("Ошибка при разрешении конфликтов:", error);
    }
  };

  const dismissConflicts = () => {
    // Просто скрываем конфликты без разрешения
    FirebaseCharactersService.clearPendingConflicts();
    setConflicts([]);
    setHasConflicts(false);
  };

  return {
    conflicts,
    hasConflicts,
    resolveConflicts,
    dismissConflicts,
  };
}
