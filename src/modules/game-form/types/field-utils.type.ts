import type { FieldPath } from "react-hook-form";
import type { FormType } from "./form/form.type.ts";

export type FormBooleanField = FieldPath<FormType> & `${string}.checked`;
