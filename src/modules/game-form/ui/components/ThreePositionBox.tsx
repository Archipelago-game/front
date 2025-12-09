import { Box } from "@mui/material";
import DropIcon from "../../../../common/components/icons/DropIcon.tsx";
import { useState } from "react";

type ThreePositionType = "clean" | "fill" | "half";

const statementIconMap = {
  fill: () => <DropIcon color="#f44336" />,
  half: () => <DropIcon color="#2196f3" />,
  clean: () => <DropIcon color="#eaeaea" />,
};

export default function ThreePositionBox() {
  const [state, setState] = useState<ThreePositionType>("clean");
  const handleClick = () => {
    switch (state) {
      case "fill":
        setState("half");
        break;
      case "half":
        setState("clean");
        break;
      case "clean":
        setState("fill");
        break;
    }
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        boxSizing: "border-box",
        width: "24px",
        height: "24px",
        padding: "2px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          boxSizing: "border-box",
          border: "2px solid gray",
          borderRadius: "2px",
          width: "19px",
          height: "19px",
        }}
      >
        {statementIconMap[state]()}
      </Box>
    </Box>
  );
}
