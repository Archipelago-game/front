import type { ControllerProps } from "./controller-props.type.ts";

export interface DefaultFieldControllerProps extends ControllerProps {
  multiline?: {
    isMultiline?: boolean;
    rows?: number;
  };
  isShowChangeValueBtn?: boolean;
  /** Показать стандартные кнопки +/- у number input (по умолчанию скрыты) */
  showSpinButtons?: boolean;
}
