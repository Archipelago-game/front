import { useMediaQuery } from "@mui/material";
import { Typography } from "@mui/material";
import Dexterity from "./dexterity/Dexterity.tsx";
import Coordination from "./coordination/Coordination.tsx";
import Insight from "./insight/Insight.tsx";
import WillPower from "./willPower/WillPower.tsx";
import Strength from "./strength/Strength.tsx";
import Intelligence from "./intelligence/Intelligence.tsx";

import { Box } from "@mui/system";
import { useState, type ReactNode, useEffect } from "react";
import { theme } from "../../../../../common/styles/theme/custom-theme.ts";

type AttributeMapKey = "1" | "2" | "3" | "4" | "5" | "6";

type AttributeMap = Record<AttributeMapKey, ReactNode>;

const attributeMap: AttributeMap = {
  "1": <Dexterity />,
  "2": <Coordination />,
  "3": <Insight />,
  "4": <Intelligence />,
  "5": <WillPower />,
  "6": <Strength />,
};

type AttributeOrderKey = "lg" | "md" | "xs";

const attributesOrder: Record<AttributeOrderKey, AttributeMapKey[][]> = {
  lg: [
    ["1", "4"],
    ["2", "5"],
    ["3", "6"],
  ],
  md: [
    ["1", "4", "5"],
    ["2", "3", "6"],
  ],
  xs: [["1", "4", "2", "5", "3", "6"]],
};

export default function Attributes() {
  const [currentMedia, setCurrentMedia] = useState<AttributeOrderKey>("lg");
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isXs = useMediaQuery(theme.breakpoints.between("xs", "md"));

  useEffect(() => {
    if (isLg) {
      setCurrentMedia("lg");
    } else if (isMd) {
      setCurrentMedia("md");
    } else {
      setCurrentMedia("xs");
    }
  }, [isLg, isMd, isXs]);

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
        }}
      >
        Атрибуты и Навыки
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
        }}
      >
        {attributesOrder[currentMedia].map((col, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            <>
              {col.map((item) => {
                return attributeMap[item];
              })}
            </>
          </Box>
        ))}
      </Box>
    </>
  );
}
