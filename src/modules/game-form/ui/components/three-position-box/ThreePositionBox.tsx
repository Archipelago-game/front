import { Box } from "@mui/material";
import DropIcon from "../../../../../common/components/icons/DropIcon.tsx";
import { type JSX } from "react";

export type ThreePositionType = "empty" | "full" | "half";
const POSITION_ORDER: ThreePositionType[] = ["empty", "full", "half"];

const statementIconMap: Record<ThreePositionType, JSX.Element> = {
  full: <DropIcon color="#f44336" />,
  half: <DropIcon color="#2196f3" />,
  empty: <DropIcon color="#666" />,
};

interface Props {
  value: ThreePositionType;
  onChange: (value: ThreePositionType) => void;
}

function cycleValue(value: ThreePositionType) {
  return POSITION_ORDER[
    (POSITION_ORDER.indexOf(value) + 1) % POSITION_ORDER.length
  ];
}

export default function ThreePositionBox({ value, onChange }: Props) {
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
          border: "2px solid gray",
          borderRadius: "50%",
          width: "19px",
          height: "19px",
        }}
      >
        {statementIconMap[value]}
      </Box>
    </Box>
  );
}
