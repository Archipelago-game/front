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
import { useSearchParams } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export function CustomFormContextProvider({ children }: Props) {
  const [formValues, setFormValues] = useState<FormType>(FORM_DEFAULT_VALUES);
  const [characterIndex, setCharacterIndex] = useState<number | null>(null);
  const [searchParams] = useSearchParams();

  const methods = useForm<FormType>({
    defaultValues: formValues,
  });

  const onChange = useCallback(
    async (
      field: ControllerRenderProps<FormType>,
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      field.onChange(e);
      if (characterIndex === null) {
        return;
      }
      await api.saveCharacterForm(characterIndex, methods.getValues());
    },
    [],
  );

  const fetchData = useCallback(async (characterIndex: number) => {
    const data = await api.getCharacterForm(characterIndex);
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
    const characterIndex = searchParams.get("characterIndex");
    if (characterIndex) {
      setCharacterIndex(Number(characterIndex));
      fetchData(Number(characterIndex));
    }
  }, [searchParams]);

  useEffect(() => {
    methods.reset(formValues);
  }, [formValues, methods]);

  return (
    <CustomFormContext.Provider value={value}>
      {children}
    </CustomFormContext.Provider>
  );
}
