import { Box, Tabs } from "@mui/material";
import type { ComponentType } from "react";
import { useCampTabs } from "./useTabs.ts";
import { StyledTab } from "./StyledTab.tsx";
import { useTheme } from "@mui/material/styles";

export interface TabDescription {
  name: string;
  component: ComponentType;
}

interface Props {
  tabs: TabDescription[];
}

export default function CustomTabsPanel({ tabs }: Props) {
  const theme = useTheme();
  const { currentTabIndex, handleSwitchTabs } = useCampTabs();
  const CurrentComponent = tabs[currentTabIndex].component;

  return (
    <Box>
      <Tabs
        value={currentTabIndex}
        onChange={handleSwitchTabs}
        sx={{
          minHeight: "100%",
          backgroundColor: theme.palette.base.surfaceLowered,
        }}
        slotProps={{ indicator: { sx: { display: "none" } } }}
      >
        {tabs.map((tab, index) => (
          <StyledTab key={tab.name} label={tab.name} value={index} />
        ))}
      </Tabs>

      <CurrentComponent />
    </Box>
  );
}
