import { useSync } from "../hooks/use-sync.hook";

interface SyncStatusProps {
  className?: string;
}

export function SyncStatus({ className }: SyncStatusProps) {
  const { isSyncing, lastSyncTime, syncError, syncAll, clearError } = useSync();

  const formatLastSync = (date: Date | null): string => {
    if (!date) return "Никогда";

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) return "Только что";
    if (diffMinutes < 60) return `${diffMinutes} мин назад`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} ч назад`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} дн назад`;
  };

  const handleSyncClick = async () => {
    try {
      await syncAll();
    } catch (error) {
      console.error("Ошибка ручной синхронизации:", error);
    }
  };

  return (
    <div className={`sync-status ${className || ""}`}>
      {syncError && (
        <div
          className="sync-error"
          style={{
            color: "red",
            fontSize: "12px",
            marginBottom: "4px",
            cursor: "pointer",
          }}
          onClick={clearError}
        >
          ⚠️ {syncError}
        </div>
      )}

      <div
        className="sync-info"
        style={{
          fontSize: "12px",
          color: isSyncing ? "orange" : "green",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        {isSyncing ? (
          <>
            <span>🔄</span>
            <span>Синхронизация...</span>
          </>
        ) : (
          <>
            <span>✅</span>
            <span>Синхронизировано: {formatLastSync(lastSyncTime)}</span>
            <button
              onClick={handleSyncClick}
              style={{
                marginLeft: "8px",
                padding: "2px 6px",
                fontSize: "10px",
                border: "1px solid #ccc",
                borderRadius: "3px",
                background: "white",
                cursor: "pointer",
              }}
            >
              Синхронизировать
            </button>
          </>
        )}
      </div>
    </div>
  );
}
