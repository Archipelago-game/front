import { Box } from "@mui/material";

import type {
  StatementColorMapping,
  StatementSingleIcon,
  ThreePositionType,
} from "./three-position-box.type.ts";
import { cycleValue } from "./cycle-value.util.ts";
import { DEFAULT_ICON, DEFAULT_STATEMENT_COLOR_MAP } from "./default.const.ts";

interface Props {
  value: ThreePositionType;
  onChange: (value: ThreePositionType) => void;
  Icon?: StatementSingleIcon;
  colors?: StatementColorMapping;
}

export default function ThreePositionBox({
  value,
  onChange,
  Icon = DEFAULT_ICON,
  colors = DEFAULT_STATEMENT_COLOR_MAP,
}: Props) {
  const handleClick = () => {
    const newValue = cycleValue(value);
    onChange(newValue);
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        boxSizing: "border-box",
        width: "24px",
        height: "24px",
        padding: "2px",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          boxSizing: "border-box",
          width: "19px",
          height: "19px",
        }}
      >
        {colors && <Icon color={colors[value]} />}
      </Box>
    </Box>
  );
}
