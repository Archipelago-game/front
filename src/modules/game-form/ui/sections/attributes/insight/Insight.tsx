import Attribute from "../Attribute.tsx";
import InsightSkillsTable from "./InsightSkillsTable.tsx";
import InsightTitle from "./InsightTitle.tsx";

export default function Insight() {
  return (
    <Attribute>
      <InsightTitle />
      <InsightSkillsTable />
    </Attribute>
  );
}
