import Attribute from "../Attribute.tsx";
import IntelligenceTitle from "./IntelligenceTitle.tsx";
import IntelligenceSkillTableTest from "./IntelligenceSkillTableAuto.tsx";

export default function Intelligence() {
  return (
    <Attribute>
      <IntelligenceTitle />
      {/*<IntelligenceSkillTable />*/}
      <IntelligenceSkillTableTest />
    </Attribute>
  );
}
