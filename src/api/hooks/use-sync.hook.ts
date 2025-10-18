import { useState, useCallback, useEffect } from "react";
import { api } from "../api";
import type { SyncResult } from "../types";

/**
 * Хук для управления синхронизацией персонажей с сервером
 */
export function useSync() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  // Загружаем время последней синхронизации при инициализации
  useEffect(() => {
    const lastSync = api.getLastSyncTime();
    setLastSyncTime(lastSync);
  }, []);

  /**
   * Синхронизировать всех персонажей
   */
  const syncAll = useCallback(async (): Promise<SyncResult> => {
    if (isSyncing) {
      throw new Error("Синхронизация уже выполняется");
    }

    setIsSyncing(true);
    setSyncError(null);

    try {
      const result = await api.syncAll();

      if (result.success) {
        setLastSyncTime(new Date());
        console.log(`Синхронизация успешна: ${result.syncedCount} персонажей`);
      } else {
        setSyncError(`Ошибки синхронизации: ${result.errors.join(", ")}`);
        console.error("Ошибки синхронизации:", result.errors);
      }

      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setSyncError(errorMessage);
      console.error("Ошибка синхронизации:", error);
      throw error;
    } finally {
      setIsSyncing(false);
    }
  }, [isSyncing]);

  /**
   * Синхронизировать конкретного персонажа
   */
  const syncCharacter = useCallback(
    async (characterId: string): Promise<SyncResult> => {
      if (isSyncing) {
        throw new Error("Синхронизация уже выполняется");
      }

      setIsSyncing(true);
      setSyncError(null);

      try {
        const result = await api.syncCharacter(characterId);

        if (result.success) {
          setLastSyncTime(new Date());
          console.log(`Персонаж ${characterId} синхронизирован`);
        } else {
          setSyncError(`Ошибки синхронизации: ${result.errors.join(", ")}`);
        }

        return result;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        setSyncError(errorMessage);
        console.error("Ошибка синхронизации персонажа:", error);
        throw error;
      } finally {
        setIsSyncing(false);
      }
    },
    [isSyncing],
  );

  /**
   * Разрешить конфликт версий
   */
  const resolveConflict = useCallback(
    async (
      characterId: string,
      resolution: "local" | "remote",
    ): Promise<void> => {
      try {
        await api.resolveConflict(characterId, resolution);
        setLastSyncTime(new Date());
        console.log(
          `Конфликт разрешен для персонажа ${characterId}: ${resolution}`,
        );
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        setSyncError(errorMessage);
        console.error("Ошибка разрешения конфликта:", error);
        throw error;
      }
    },
    [],
  );

  /**
   * Очистить ошибку синхронизации
   */
  const clearError = useCallback(() => {
    setSyncError(null);
  }, []);

  /**
   * Проверить, нужна ли синхронизация
   */
  const needsSync = useCallback((): boolean => {
    if (!lastSyncTime) return true;

    // Синхронизируем, если прошло больше 5 минут
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return lastSyncTime < fiveMinutesAgo;
  }, [lastSyncTime]);

  /**
   * Автоматическая синхронизация при необходимости
   */
  const autoSync = useCallback(async (): Promise<void> => {
    if (needsSync() && !isSyncing) {
      try {
        await syncAll();
      } catch (error) {
        console.warn("Автоматическая синхронизация не удалась:", error);
      }
    }
  }, [needsSync, isSyncing, syncAll]);

  return {
    // Состояние
    isSyncing,
    lastSyncTime,
    syncError,

    // Методы
    syncAll,
    syncCharacter,
    resolveConflict,
    clearError,
    autoSync,
    needsSync,
  };
}
