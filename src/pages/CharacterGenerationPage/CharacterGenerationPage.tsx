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
} from "../../global-modules/character-generation";
import type { GenerationStepPayload } from "../../global-modules/character-generation";
import clonedeep from "lodash.clonedeep";

// todo перенести в подходящий раздел
function typedKeys<T extends object>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}

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
            wizard: { lastCompletedStepIndex: currentStepIndex },
          });
          navigate(`/character-generation/${id}`);
        } else if (characterDoc) {
          const updated: CharacterDocument = {
            ...characterDoc,
            data: {
              ...characterDoc.data,
              name: characterDoc.data.name || defaultName,
              race: payload.race,
              wizard: { lastCompletedStepIndex: currentStepIndex },
            },
          };
          await api.saveCharacterForm(userInfo.uid, updated);
          setCharacterDoc(updated);
          setCurrentStepIndex(1);
        }
      } catch {
        showMessage({ message: "Ошибка создания персонажа" });
      } finally {
        setLoading(false);
      }
      return;
    }

    if (currentStepIndex === 1 && characterId && characterDoc) {
      setLoading(true);
      try {
        const updated: CharacterDocument = {
          ...characterDoc,
          data: {
            ...characterDoc.data,
            ...(payload?.moralValue && { moralValue: payload.moralValue }),
            wizard: { lastCompletedStepIndex: currentStepIndex },
          },
        };
        await api.saveCharacterForm(userInfo.uid, updated);
        setCharacterDoc(updated);
        setCurrentStepIndex(2);
      } catch {
        showMessage({ message: "Ошибка сохранения персонажа" });
      } finally {
        setLoading(false);
      }
      return;
    }

    if (
      currentStepIndex === 2 &&
      characterId &&
      characterDoc &&
      payload?.homeland !== undefined
    ) {
      setLoading(true);
      try {
        const updated: CharacterDocument = {
          ...characterDoc,
          data: {
            ...characterDoc.data,
            homeland: payload.homeland,
            languages: payload.languages ?? characterDoc.data.languages ?? "",
            wizard: { lastCompletedStepIndex: currentStepIndex },
          },
        };
        await api.saveCharacterForm(userInfo.uid, updated);
        setCharacterDoc(updated);
        setCurrentStepIndex(3);
      } catch {
        showMessage({ message: "Ошибка сохранения персонажа" });
      } finally {
        setLoading(false);
      }
      return;
    }

    if (
      currentStepIndex === 3 &&
      characterId &&
      characterDoc &&
      payload?.attributeValues
    ) {
      setLoading(true);
      try {
        const stats = clonedeep(characterDoc.data.stats);
        for (const key of typedKeys(stats)) {
          if (stats[key] && typeof payload.attributeValues[key] === "number") {
            stats[key].value = payload.attributeValues[key];
          }
        }
        const updated: CharacterDocument = {
          ...characterDoc,
          data: {
            ...characterDoc.data,
            stats,
            wizard: { lastCompletedStepIndex: currentStepIndex },
          },
        };
        await api.saveCharacterForm(userInfo.uid, updated);
        setCharacterDoc(updated);
        navigate(`/game-form/${characterId}`);
      } catch {
        showMessage({ message: "Ошибка сохранения персонажа" });
      } finally {
        setLoading(false);
      }
      return;
    }
  };

  if (!userInfo) {
    return <Box>Персонажи не найдены</Box>;
  }

  if (characterId && loadingCharacter) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", pt: 4, pb: 4, pl: 0 }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <CharacterGenerationWizard
      currentStepIndex={currentStepIndex}
      setCurrentStepIndex={setCurrentStepIndex}
      characterData={characterDoc?.data}
      onStepComplete={handleStepComplete}
      isSubmitting={loading}
    />
  );
}
