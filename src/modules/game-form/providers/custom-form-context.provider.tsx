import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CustomFormContext } from "./use-custom-context-form.hook.ts";

import type { FormType } from "../types/form/form.type.ts";
import { FORM_DEFAULT_VALUES } from "../consts/form-default-values.const.ts";
import { useForm } from "react-hook-form";
import { api } from "../../../api/api.ts";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../app/providers/auth-provider/use-auth-context.hook.ts";
import type { CharacterDocument } from "../../../api/firebase-characters-service.ts";

import debounce from "lodash.debounce";
import type { OnChangeCallbackType } from "../types/on-change-callback.type.ts";
import { migrationUtils } from "../../../app/migrations/migration-utils.class.ts";

interface Props {
  children: ReactNode;
}

const saveCharacterForm = debounce(api.saveCharacterForm, 500);

export function CustomFormContextProvider({ children }: Props) {
  const { userInfo } = useAuthContext();
  const [characterDoc, setCharacterDoc] = useState<CharacterDocument | null>(
    null,
  );

  const { characterId } = useParams();

  const methods = useForm<FormType>({
    defaultValues: characterDoc?.data ?? FORM_DEFAULT_VALUES,
  });

  const onChange: OnChangeCallbackType = useCallback(
    async (field, e) => {
      if (field && e) {
        field.onChange(e);
      }

      if (characterId === null || userInfo === null || characterDoc === null) {
        console.log(
          `нет одного из следующих свойств: characterId: ${characterId}, userInfo: ${userInfo},  characterDoc: ${characterDoc}`,
        );
        return;
      }

      await saveCharacterForm(userInfo.uid, {
        ...characterDoc,
        data: methods.getValues(),
      });
    },
    [userInfo, characterDoc, characterId],
  );

  const fetchData = useCallback(async (userId: string, characterId: string) => {
    let characterDoc = await api.getCharacterForm(userId, characterId);
    if (!characterDoc) {
      return;
    }
    characterDoc = migrationUtils.migrate(userId, characterDoc);
    setCharacterDoc(characterDoc);
  }, []);

  const value = useMemo(
    () => ({
      methods,
      onChange,
      values: characterDoc?.data ?? FORM_DEFAULT_VALUES,
    }),
    [characterDoc, methods, onChange],
  );

  useEffect(() => {
    if (characterId && userInfo) {
      fetchData(userInfo.uid, characterId);
    }
  }, [characterId, userInfo]);

  useEffect(() => {
    methods.reset(characterDoc?.data ?? FORM_DEFAULT_VALUES);
  }, [characterDoc, methods]);

  return (
    <CustomFormContext.Provider value={value}>
      {children}
    </CustomFormContext.Provider>
  );
}
