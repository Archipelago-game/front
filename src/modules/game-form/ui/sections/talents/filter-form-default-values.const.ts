import type { TalentsFilterFormValues } from "./filter/TalentsFilterForm.tsx";

const EMPTY_BRANCH_VALUE = "allBranches";
const EMPTY_BRANCH_LABEL = "Все ветки";
export const EMPTY_BRANCH_OPTION = {
  value: EMPTY_BRANCH_VALUE,
  label: EMPTY_BRANCH_LABEL,
};

export const TALENTS_FILTER_FORM_DEFAULT_VALUES: TalentsFilterFormValues = {
  branch: EMPTY_BRANCH_VALUE,
  search: "",
};
