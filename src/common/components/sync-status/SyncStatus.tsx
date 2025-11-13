import { Box, Chip } from "@mui/material";
import { CloudOff, Cloud } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { api } from "../../../api/api.ts";

// note в данный момент не отображает действительное состояние

export default function SyncStatus() {
  const [isOnline, setIsOnline] = useState(api.isOnline());

  const handleOnline = () => {
    setIsOnline(true);
  };

  const handleOffline = () => {
    setIsOnline(false);
  };

  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const getStatusColor = () => {
    return isOnline ? "success" : "warning";
  };

  const getStatusIcon = () => {
    if (!isOnline) return <CloudOff />;
    return <Cloud />;
  };

  const getStatusText = () => {
    if (!isOnline) return "Локально";
    return "В сети";
  };

  return (
    <Box display="flex">
      <Box display="flex" flexDirection={"column"} gap={2}>
        <Chip
          icon={getStatusIcon()}
          label={getStatusText()}
          color={getStatusColor() as never}
          size="small"
          variant="outlined"
        />
      </Box>
    </Box>
  );
}
