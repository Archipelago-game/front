import type {
  StatementColorMapping,
  StatementSingleIcon,
} from "./three-position-box.type.ts";
import CustomHeartBrokenIcon from "../../../../../../common/components/icons/CustomHeartBrokenIcon.tsx";

export const DEFAULT_STATEMENT_COLOR_MAP: StatementColorMapping = {
  full: "#f44336",
  half: "#2196f3",
  empty: "#666",
};
export const DEFAULT_ICON: StatementSingleIcon = CustomHeartBrokenIcon;
