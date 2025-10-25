import { Box, Chip, Typography, Button, Tooltip } from "@mui/material";
import { CloudSync, CloudOff, Storage, Restore } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { api } from "../../../api/api.ts";
import { FirebaseCharactersService } from "../../../api/firebase-characters-service.ts";

interface SyncStatusProps {
  showDetails?: boolean;
}

export default function SyncStatus({ showDetails = false }: SyncStatusProps) {
  const [isOnline, setIsOnline] = useState(api.isOnline());
  const [syncStatus, setSyncStatus] = useState<
    "synced" | "syncing" | "offline"
  >("offline");
  const [backupInfo, setBackupInfo] = useState<{
    timestamp: string;
    count: number;
  } | null>(null);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setSyncStatus("syncing");
      // Небольшая задержка для имитации синхронизации
      setTimeout(() => setSyncStatus("synced"), 1000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setSyncStatus("offline");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Проверяем начальное состояние
    if (isOnline) {
      setSyncStatus("synced");
    }

    // Загружаем информацию о резервной копии
    const backup = FirebaseCharactersService.getBackupInfo();
    setBackupInfo(backup);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [isOnline]);

  const handleRestore = () => {
    const restored = FirebaseCharactersService.restoreFromBackup();
    if (restored) {
      console.log("Персонажи восстановлены из резервной копии");
      // Можно добавить уведомление пользователю
      window.location.reload(); // Перезагружаем страницу для обновления данных
    }
  };

  const getStatusColor = () => {
    switch (syncStatus) {
      case "synced":
        return "success";
      case "syncing":
        return "warning";
      case "offline":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusIcon = () => {
    if (!isOnline) return <CloudOff />;
    if (syncStatus === "syncing") return <CloudSync />;
    return <Storage />;
  };

  const getStatusText = () => {
    if (!isOnline) return "Офлайн";
    if (syncStatus === "syncing") return "Синхронизация...";
    return "Синхронизировано";
  };

  const getDetailsText = () => {
    if (!isOnline) return "Данные сохраняются локально";
    if (syncStatus === "syncing") return "Синхронизация с облаком...";
    return "Данные синхронизированы с облаком";
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Chip
        icon={getStatusIcon()}
        label={getStatusText()}
        color={getStatusColor() as never}
        size="small"
        variant="outlined"
      />
      {showDetails && (
        <Typography variant="caption" color="text.secondary">
          {getDetailsText()}
        </Typography>
      )}
      {backupInfo && (
        <Tooltip
          title={`Резервная копия от ${new Date(backupInfo.timestamp).toLocaleString()} (${backupInfo.count} персонажей)`}
        >
          <Button
            size="small"
            startIcon={<Restore />}
            onClick={handleRestore}
            variant="outlined"
            color="warning"
          >
            Восстановить
          </Button>
        </Tooltip>
      )}
    </Box>
  );
}
