import { Box, Collapse, Tabs } from "@mui/material";
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
  const [open, setOpen] = useState(true);
  const { currentTabIndex, handleSwitchTabs } = useCampTabs();
  const CurrentComponent = tabs[currentTabIndex].component;

  return (
    <Box>
      <AccordionHeader onClick={() => setOpen((prev) => !prev)}>
        <Tabs
          value={currentTabIndex}
          onChange={handleSwitchTabs}
          sx={{
            minHeight: "100%",
            backgroundColor: theme.palette.base.surfaceLowered,
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
            flexGrow: 1,
            marginRight: "-40px",
          }}
          slotProps={{ indicator: { sx: { display: "none" } } }}
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
