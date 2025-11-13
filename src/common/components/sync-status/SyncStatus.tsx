import { Box, Chip, Typography } from "@mui/material";
import { CloudSync, CloudOff, Storage } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { api } from "../../../api/api.ts";

interface SyncStatusProps {
  showDetails?: boolean;
}

// note в данный момент не отображает действительное состояние

export default function SyncStatus({ showDetails = false }: SyncStatusProps) {
  const [isOnline, setIsOnline] = useState(api.isOnline());
  const [syncStatus, setSyncStatus] = useState<
    "synced" | "syncing" | "offline"
  >("offline");

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

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [isOnline]);

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
    <Box display="flex">
      <Box display="flex" flexDirection={"column"} gap={1}>
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
      </Box>
    </Box>
  );
}
