import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../app/providers/auth-provider/use-auth-context.hook.ts";

import { api } from "../../api/api.ts";

import Characters from "../../modules/characters/Characters.tsx";
import { Box } from "@mui/system";

import type { CharacterDocument } from "../../api/firebase-characters-service.ts";
import { useSnackbarContext } from "../../app/providers/snackbar-provider/use-snackbar-context.hook.ts";
import { useConfirmDialogContext } from "../../modules/confirm-dialog/use-confirm-dialog.hook.ts";
import { prepareCharacterExport } from "./prepare-character-export.util.ts";
import { downloadJSON } from "../../common/utils/downloadJSON.util.ts";
import {
  ERROR_CODE,
  UnpackFileToCharacterForm,
} from "./unpack-file-json.util.ts";

export default function CharactersPage() {
  const { open } = useConfirmDialogContext();
  const { showMessage } = useSnackbarContext();
  const navigate = useNavigate();
  const { userInfo } = useAuthContext();
  const [characterDocs, setCharacterDocs] = useState<CharacterDocument[]>([]);

  const fetchCharacters = async (userId: string) => {
    const data = await api.getCharacters(userId);
    setCharacterDocs(data);
  };

  const addCharacter = async (userId: string) => {
    const characterId = await api.addNewCharacter(userId);
    navigate(`/game-form/${characterId}`);
  };

  const deleteCharacter = async (userId: string, characterId: string) => {
    open({
      message: "Действительно хотите удалить героя?",
      onConfirm: async () => {
        await api.deleteCharacter(userId, characterId);
        await fetchCharacters(userId);
        showMessage({ message: "герой был удален" });
      },
    });
  };

  const exportCharacter = async (userId: string, characterId: string) => {
    const character = await api.getCharacterForm(userId, characterId);
    if (!character) {
      showMessage({ message: "Ошибка: герой не найден" });
      return;
    }

    const data = await prepareCharacterExport(character.data);
    const fileName = `character-${characterId}-${new Date().toLocaleDateString("ru-RU")}.archipelago`;
    downloadJSON(data, fileName);
  };

  const importCharacter = async (userId: string, file?: File) => {
    console.log("importCharacter");

    if (!file) {
      showMessage({ message: "Ошибка: файл не найден" });
      return;
    }

    try {
      const character = await UnpackFileToCharacterForm(file);
      await api.addNewCharacter(userId, character);
      await fetchCharacters(userId);
      //   eslint-disable-next-line
    } catch (e: any) {
      if (e.message === ERROR_CODE.wrongFile) {
        showMessage({ message: "Неправильный файл" });
      } else if (e.message === ERROR_CODE.wrongHash) {
        showMessage({
          message: "Обнаружено несанкционированное изменение файла",
        });
      } else {
        throw e;
      }
    }
  };

  const openCharacterForm = async (characterId: string) => {
    navigate(`/game-form/${characterId}`);
  };

  useEffect(() => {
    if (userInfo) {
      fetchCharacters(userInfo.uid);
    }
  }, [userInfo]);

  if (!userInfo) {
    return <Box>Персонажи не найдены</Box>;
  }

  return (
    <Characters
      characters={characterDocs}
      openCharacterForm={openCharacterForm}
      addCharacter={() => addCharacter(userInfo.uid)}
      deleteCharacter={(characterId: string) =>
        deleteCharacter(userInfo.uid, characterId)
      }
      exportCharacter={(characterId: string) =>
        exportCharacter(userInfo.uid, characterId)
      }
      importCharacter={(file) => importCharacter(userInfo.uid, file)}
    />
  );
}
