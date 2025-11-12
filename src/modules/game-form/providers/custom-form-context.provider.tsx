import {
  type ChangeEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CustomFormContext } from "./use-custom-context-form.hook.ts";

import type { FormType } from "../types/form/form.type.ts";
import { FORM_DEFAULT_VALUES } from "../consts/form-default-values.const.ts";
import { type ControllerRenderProps, useForm } from "react-hook-form";
import { api } from "../../../api/api.ts";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../app/providers/auth-provider/use-auth-context.hook.ts";
import type { CharacterDocument } from "../../../api/firebase-characters-service.ts";

interface Props {
  children: ReactNode;
}

export function CustomFormContextProvider({ children }: Props) {
  const { userInfo } = useAuthContext();
  const [characterDoc, setCharacterDoc] = useState<CharacterDocument>("");
  const [formValues, setFormValues] = useState<FormType>(FORM_DEFAULT_VALUES);

  const { characterId } = useParams();

  const methods = useForm<FormType>({
    defaultValues: formValues,
  });

  const onChange = useCallback(
    async (
      field: ControllerRenderProps<FormType>,
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      field.onChange(e);
      if (characterId === null) {
        return;
      }
      await api.saveCharacterForm(characterId, methods.getValues());
    },
    [],
  );

  const fetchData = useCallback(async (userId: string, characterId: string) => {
    const data = await api.getCharacterForm(userId, characterId);
    setFormValues(data);
  }, []);

  const value = useMemo(
    () => ({
      methods,
      onChange,
      values: formValues,
    }),
    [formValues, methods, onChange],
  );

  useEffect(() => {
    if (characterId && userInfo) {
      fetchData(userInfo.uid, characterId);
    }
  }, [characterId, userInfo]);

  useEffect(() => {
    methods.reset(formValues);
  }, [formValues, methods]);

  return (
    <CustomFormContext.Provider value={value}>
      {children}
    </CustomFormContext.Provider>
  );
}
