import CycleFillIcon from "./CycleFillIcon.tsx";
import type {
  ComponentIcon,
  StatementColorMapping,
} from "./check-icon-box.type.ts";

export const DEFAULT_STATEMENT_COLOR_MAP: StatementColorMapping = new Map([
  [true, "#2196f3"],
  [false, "#666"],
]);

export const DEFAULT_ICON: ComponentIcon = CycleFillIcon;
