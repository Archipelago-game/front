import Attribute from "../Attribute.tsx";

import InsightTitle from "./InsightTitle.tsx";
import InsightSkillTableAuto from "./InsightSkillsTableAuto.tsx";

export default function Insight() {
  return (
    <Attribute>
      <InsightTitle />
      <InsightSkillTableAuto />
    </Attribute>
  );
}
