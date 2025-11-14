import { Box } from "@mui/material";
import { CloudOff, CloudOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { api } from "../../../api/api.ts";

// note в данный момент не отображает действительное состояние

export default function OnlineStatus() {
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

  const getStatusIcon = () => {
    if (!isOnline) return <CloudOff color="warning" />;
    return <CloudOutlined color="success" />;
  };

  return (
    <Box display="flex">
      <Box display="flex" flexDirection={"column"} gap={2}>
        {getStatusIcon()}
      </Box>
    </Box>
  );
}
