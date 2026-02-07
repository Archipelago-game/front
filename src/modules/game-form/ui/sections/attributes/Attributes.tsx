import { useMediaQuery } from "@mui/material";

import Dexterity from "./dexterity/Dexterity.tsx";
import Coordination from "./coordination/Coordination.tsx";
import Insight from "./insight/Insight.tsx";
import WillPower from "./willPower/WillPower.tsx";
import Strength from "./strength/Strength.tsx";
import Intelligence from "./intelligence/Intelligence.tsx";

import { Box } from "@mui/system";
import { useState, type ReactNode, useEffect } from "react";

import SectionTitle from "../../components/section/SectionTitle.tsx";
import { useTheme } from "@mui/material/styles";

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

type AttributeOrderKey = "lg" | "md" | "phablet" | "tablet" | "xs";

const attributesOrder: Record<AttributeOrderKey, AttributeMapKey[][]> = {
  lg: [
    ["6", "1"],
    ["2", "4"],
    ["3", "5"],
  ],
  md: [
    ["6", "1", "2"],
    ["4", "3", "5"],
  ],

  tablet: [["6", "1", "2", "4", "3", "5"]],
  phablet: [
    ["6", "1", "2"],
    ["4", "3", "5"],
  ],
  xs: [["6", "1", "2", "4", "3", "5"]],
};

export default function Attributes() {
  const theme = useTheme();
  const [currentMedia, setCurrentMedia] = useState<AttributeOrderKey>("lg");
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isTablet = useMediaQuery(theme.breakpoints.between("tablet", "md"));
  const isPhablet = useMediaQuery(
    theme.breakpoints.between("phablet", "tablet"),
  );
  const isXs = useMediaQuery(theme.breakpoints.between("xs", "md"));

  useEffect(() => {
    if (isLg) {
      setCurrentMedia("lg");
    } else if (isMd) {
      setCurrentMedia("md");
    } else if (isTablet) {
      setCurrentMedia("tablet");
    } else if (isPhablet) {
      setCurrentMedia("phablet");
    } else {
      setCurrentMedia("xs");
    }
  }, [isLg, isMd, isXs, isPhablet, isTablet]);

  return (
    <Box>
      <SectionTitle title="Атрибуты и Навыки" />
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            phablet: "repeat(2, 1fr)",
            tablet: "1fr",
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
              {col.map((item) => (
                <Box key={item}>{attributeMap[item]}</Box>
              ))}
            </>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
