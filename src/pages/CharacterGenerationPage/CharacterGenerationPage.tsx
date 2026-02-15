import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useAuthContext } from "../../app/providers/auth-provider/use-auth-context.hook.ts";
import { useSnackbarContext } from "../../app/providers/snackbar-provider/use-snackbar-context.hook.ts";
import { api } from "../../api/api.ts";
import { FORM_DEFAULT_VALUES } from "../../modules/game-form/consts/form-default-values.const.ts";
import { mapRace } from "../../modules/game-form/consts/map-race.const.ts";
import type { CharacterDocument } from "../../services/character/firebase-characters-service.ts";
import {
  CharacterGenerationWizard,
  GENERATION_STEPS,
} from "../../global-modules/character-generation/index.ts";
import type { GenerationStepPayload } from "../../global-modules/character-generation/types.ts";

export default function CharacterGenerationPage() {
  const { characterId } = useParams<{ characterId?: string }>();
  const { userInfo } = useAuthContext();
  const { showMessage } = useSnackbarContext();
  const navigate = useNavigate();
  const [characterDoc, setCharacterDoc] = useState<CharacterDocument | null>(
    null,
  );
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingCharacter, setLoadingCharacter] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      setCharacterDoc(null);
      setCurrentStepIndex(0);
      return;
    }
    if (!characterId) {
      setCharacterDoc(null);
      setCurrentStepIndex(0);
      return;
    }
    setLoadingCharacter(true);
    api
      .getCharacterForm(userInfo.uid, characterId)
      .then((doc) => {
        if (!doc) {
          showMessage({ message: "Персонаж не найден" });
          navigate("/characters");
          return;
        }
        setCharacterDoc(doc);
        const last = doc.data.wizard?.lastCompletedStepIndex ?? -1;
        const next = last + 1;
        if (next >= GENERATION_STEPS.length) {
          navigate(`/game-form/${characterId}`);
          return;
        }
        setCurrentStepIndex(next);
      })
      .catch(() => {
        showMessage({ message: "Ошибка загрузки персонажа" });
        navigate("/characters");
      })
      .finally(() => {
        setLoadingCharacter(false);
      });
  }, [userInfo, characterId, navigate, showMessage]);

  const handleStepComplete = async (payload?: GenerationStepPayload) => {
    if (!userInfo) return;
    if (currentStepIndex === 0 && payload?.race !== undefined) {
      setLoading(true);
      try {
        const defaultName = `новый ${mapRace[payload.race]}`;
        if (!characterId) {
          const id = await api.addNewCharacter(userInfo.uid, {
            ...FORM_DEFAULT_VALUES,
            name: defaultName,
            race: payload.race,
            wizard: { lastCompletedStepIndex: 0 },
          });
          navigate(`/game-form/${id}`);
        } else if (characterDoc) {
          const updated: CharacterDocument = {
            ...characterDoc,
            data: {
              ...characterDoc.data,
              name: characterDoc.data.name || defaultName,
              race: payload.race,
              wizard: { lastCompletedStepIndex: 0 },
            },
          };
          await api.saveCharacterForm(userInfo.uid, updated);
          navigate(`/game-form/${characterId}`);
        }
      } catch {
        showMessage({ message: "Ошибка создания персонажа" });
      } finally {
        setLoading(false);
      }
    }
  };

  if (!userInfo) {
    return <Box>Персонажи не найдены</Box>;
  }

  if (characterId && loadingCharacter) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <CharacterGenerationWizard
        currentStepIndex={currentStepIndex}
        characterData={characterDoc?.data}
        onStepComplete={handleStepComplete}
        isSubmitting={loading}
      />
    </Box>
  );
}
