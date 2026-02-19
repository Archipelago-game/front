import { Box, Collapse, Tabs, useMediaQuery } from "@mui/material";
import { type ComponentType, useState } from "react";
import { useCampTabs } from "./useTabs.ts";
import { StyledTab } from "./StyledTab.tsx";
import { useTheme } from "@mui/material/styles";
import AccordionHeader from "../../../modules/game-form/ui/components/section/AccordionHeader.tsx";

export interface TabDescription {
  name: string;
  component: ComponentType;
}

interface Props {
  tabs: TabDescription[];
}

export default function CustomTabsPanel({ tabs }: Props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("tablet"));
  const [open, setOpen] = useState(true);
  const { currentTabIndex, handleSwitchTabs } = useCampTabs();
  const CurrentComponent = tabs[currentTabIndex].component;

  return (
    <Box>
      <AccordionHeader
        sx={{
          color: theme.palette.base.text.onLowered,
          backgroundColor: theme.palette.base.surfaceLowered,
          paddingRight: 2,
        }}
        onClick={() => setOpen((prev) => !prev)}
        isExpanded={open}
      >
        <Tabs
          value={currentTabIndex}
          onChange={handleSwitchTabs}
          orientation={isSmallScreen ? "vertical" : "horizontal"}
          sx={{
            minHeight: "100%",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
            flexGrow: 1,
            ...(isSmallScreen && {
              flexDirection: "column",
              width: "100%",
            }),
          }}
          slotProps={{
            indicator: { sx: { display: "none" } },
            list: {
              sx: isSmallScreen
                ? { width: "100%", flexDirection: "column" }
                : undefined,
            },
          }}
        >
          {tabs.map((tab, index) => (
            <StyledTab key={tab.name} label={tab.name} value={index} />
          ))}
        </Tabs>
      </AccordionHeader>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <CurrentComponent />
      </Collapse>
    </Box>
  );
}
