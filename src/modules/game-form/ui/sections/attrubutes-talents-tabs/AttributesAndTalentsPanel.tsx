import CustomTabsPanel from "../../../../../common/components/tabs-panel/CustomTabsPanel.tsx";

import Attributes from "../attributes/Attributes.tsx";
import Talents from "../talents/Talents.tsx";

const TABS = [
  {
    name: "Аттрибуты",
    component: Attributes,
  },
  {
    name: "Таланты",
    component: Talents,
  },
];

export default function AttributesAndTalentsPanel() {
  return <CustomTabsPanel tabs={TABS} />;
}
