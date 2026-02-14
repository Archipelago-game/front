import CustomTabsPanel from "../../../../../common/components/tabs-panel/CustomTabsPanel.tsx";

import Attributes from "../attributes/Attributes.tsx";
import Talents from "../talents/Talents.tsx";
import Notes from "../notes/Notes.tsx";

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
    name: "Заметки",
    component: Notes,
  },
];

export default function AttributesAndTalentsPanel() {
  return <CustomTabsPanel tabs={TABS} />;
}
