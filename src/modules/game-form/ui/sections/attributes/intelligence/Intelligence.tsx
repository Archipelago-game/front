import Attribute from "../Attribute.tsx";
import IntelligenceTitle from "./IntelligenceTitle.tsx";
import IntelligenceSkillTable from "./IntelligenceSkillTable.tsx";
import IntelligenceSkillTableTest from "./Auto.tsx";

export default function Intelligence() {
  return (
    <Attribute>
      <IntelligenceTitle />
      {/*<IntelligenceSkillTable />*/}
      <IntelligenceSkillTableTest />
    </Attribute>
  );
}
