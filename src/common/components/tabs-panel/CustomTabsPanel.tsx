import { Box, Tabs } from "@mui/material";
import type { ComponentType } from "react";
import { useCampTabs } from "./useTabs.ts";
import { StyledTab } from "./StyledTab.tsx";

export interface TabDescription {
  name: string;
  component: ComponentType;
}

interface Props {
  tabs: TabDescription[];
}

export default function CustomTabsPanel({ tabs }: Props) {
  const { currentTabIndex, handleSwitchTabs } = useCampTabs();
  const CurrentComponent = tabs[currentTabIndex].component;

  return (
    <>
      <Tabs
        value={currentTabIndex}
        onChange={handleSwitchTabs}
        sx={{ mb: 2 }}
        slotProps={{ indicator: { sx: { display: "none" } } }}
      >
        {tabs.map((tab, index) => (
          <StyledTab key={tab.name} label={tab.name} value={index} />
        ))}
      </Tabs>
      <Box>
        <CurrentComponent />
      </Box>
    </>
  );
}
