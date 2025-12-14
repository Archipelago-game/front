import { Box, Tab, Tabs } from "@mui/material";
import type { ComponentType } from "react";

interface TabItem {
  name: string;
  path: string;
  component: ComponentType;
}

const currentTabIndex = 1;

interface Props {
  tabs: TabItem[];
}

function handleSwitchTabs({ tabs }: Props) {}
export default function CustomTabs() {
  return (
    <Box>
      <Tabs value={currentTabIndex} onChange={handleSwitchTabs} sx={{ mb: 2 }}>
        {TABS.map((tab, index) => (
          <Tab key={tab.name} label={tab.name} value={index} />
        ))}
      </Tabs>
      <Box>
        <CurrentComponent />
      </Box>
    </Box>
  );
}
