import type { FormType } from "../types/form-values.type.ts";
import { useCallback, useEffect, useState } from "react";
import { FORM_DEFAULT_VALUES } from "../consts/form-default-values.const.ts";
import { api } from "../../../api/api.ts";
import { useForm } from "react-hook-form";

export function useFormCustom() {
  const [state, setState] = useState<FormType>(FORM_DEFAULT_VALUES);

  const methods = useForm<FormType>({
    defaultValues: state,
  });

  const fetchData = useCallback(async () => {
    const data = await api.getOne();
    setState(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    methods.reset(state);
  }, [state, methods]);

  return { methods, values: state };
}
