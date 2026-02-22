import CustomTabsPanel from "../../../../../common/components/tabs-panel/CustomTabsPanel.tsx";

import Attributes from "../attributes/Attributes.tsx";
import Talents from "../talents/Talents.tsx";
import Notes from "../notes/Notes.tsx";
import MoralValues from "../moral-values/MoralValues.tsx";

import PrintOff from "../../../../../common/components/print/PrintOff.tsx";
import PrintOn from "../../../../../common/components/print/PrintOn.tsx";
import { Stack } from "@mui/material";

const TABS = [
  {
    name: "Аттрибуты",
    component: Attributes,
  },
  {
    name: "Таланты",
    component: Talents,
  },
  {
    name: "Ценности",
    component: MoralValues,
  },
  {
    name: "Заметки",
    component: Notes,
  },
];

export default function TabsPanel() {
  return (
    <>
      <PrintOn>
        <Stack rowGap={2}>
          <Attributes />
          <Talents />
        </Stack>
      </PrintOn>
      <PrintOff>
        <CustomTabsPanel tabs={TABS} />
      </PrintOff>
    </>
  );
}
