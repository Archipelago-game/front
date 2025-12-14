import { Box, Tab, Tabs } from "@mui/material";
import type { ComponentType } from "react";
import { useCampTabs } from "./useTabs.ts";

export interface TabDescription {
  name: string;
  path: string;
  component: ComponentType;
}

interface Props {
  tabs: TabDescription[];
}

export default function CustomTabs({ tabs }: Props) {
  const { currentTabIndex, handleSwitchTabs } = useCampTabs();
  const CurrentComponent = tabs[currentTabIndex].component;

  return (
    <Box>
      <Tabs value={currentTabIndex} onChange={handleSwitchTabs} sx={{ mb: 2 }}>
        {tabs.map((tab, index) => (
          <Tab key={tab.name} label={tab.name} value={index} />
        ))}
      </Tabs>
      <Box>
        <CurrentComponent />
      </Box>
    </Box>
  );
}
