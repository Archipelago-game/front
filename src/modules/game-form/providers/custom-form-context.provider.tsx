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

interface Props {
  children: ReactNode;
}

export function CustomFormContextProvider({ children }: Props) {
  const [formValues, setFormValues] = useState<FormType>(FORM_DEFAULT_VALUES);

  const { characterIndex } = useParams();

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
      await api.saveCharacterForm(Number(characterIndex), methods.getValues());
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
    if (characterIndex) {
      fetchData(Number(characterIndex));
    }
  }, [characterIndex]);

  useEffect(() => {
    methods.reset(formValues);
  }, [formValues, methods]);

  return (
    <CustomFormContext.Provider value={value}>
      {children}
    </CustomFormContext.Provider>
  );
}
