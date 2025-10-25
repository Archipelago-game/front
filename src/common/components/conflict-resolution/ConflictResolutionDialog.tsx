import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Radio,
  FormControlLabel,
  RadioGroup,
  Divider,
} from "@mui/material";
import type { FormType } from "../../../modules/game-form/types/form/form.type.ts";

interface ConflictData {
  index: number;
  local: FormType;
  remote: FormType;
}

interface ConflictResolutionDialogProps {
  open: boolean;
  conflicts: ConflictData[];
  onResolve: (
    resolutions: Array<{
      index: number;
      resolution: "local" | "remote" | "merge";
    }>,
  ) => void;
  onClose: () => void;
}

export default function ConflictResolutionDialog({
  open,
  conflicts,
  onResolve,
  onClose,
}: ConflictResolutionDialogProps) {
  const [resolutions, setResolutions] = useState<
    Record<number, "local" | "remote" | "merge">
  >({});

  const handleResolutionChange = (
    index: number,
    resolution: "local" | "remote" | "merge",
  ) => {
    setResolutions((prev) => ({
      ...prev,
      [index]: resolution,
    }));
  };

  const handleResolve = () => {
    const resolutionArray = Object.entries(resolutions).map(
      ([index, resolution]) => ({
        index: parseInt(index),
        resolution,
      }),
    );
    onResolve(resolutionArray);
    onClose();
  };

  const getCharacterDisplayName = (character: FormType) => {
    return character.name || "Безымянный герой";
  };

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle>Обнаружены конфликты синхронизации</DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          При синхронизации обнаружены конфликты между локальными и облачными
          данными. Выберите, какую версию использовать для каждого персонажа.
        </Typography>

        {conflicts.map((conflict) => (
          <Card key={conflict.index} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Персонаж: {getCharacterDisplayName(conflict.local)}
              </Typography>

              <RadioGroup
                value={resolutions[conflict.index] || "remote"}
                onChange={(e) =>
                  handleResolutionChange(
                    conflict.index,
                    e.target.value as never,
                  )
                }
              >
                <FormControlLabel
                  value="remote"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="subtitle2">
                        Использовать облачную версию
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Последние изменения с другого устройства
                      </Typography>
                    </Box>
                  }
                />

                <FormControlLabel
                  value="local"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="subtitle2">
                        Использовать локальную версию
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Ваши локальные изменения
                      </Typography>
                    </Box>
                  }
                />

                <FormControlLabel
                  value="merge"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="subtitle2">
                        Объединить изменения
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Попытка автоматического слияния
                      </Typography>
                    </Box>
                  }
                />
              </RadioGroup>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" gap={2}>
                <Box flex={1}>
                  <Typography variant="caption" color="primary">
                    Локальная версия:
                  </Typography>
                  <Typography variant="body2">
                    Имя: {conflict.local.name || "Не указано"}
                  </Typography>
                </Box>

                <Box flex={1}>
                  <Typography variant="caption" color="secondary">
                    Облачная версия:
                  </Typography>
                  <Typography variant="body2">
                    Имя: {conflict.remote.name || "Не указано"}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button
          onClick={handleResolve}
          variant="contained"
          disabled={Object.keys(resolutions).length !== conflicts.length}
        >
          Разрешить конфликты
        </Button>
      </DialogActions>
    </Dialog>
  );
}
