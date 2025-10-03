import CoordinationTitle from "./CoordinationTitle.tsx";
import CoordinationSkillTable from "./CoordinationSkillTable.tsx";
import Attribute from "../Attribute.tsx";

export default function Coordination() {
  return (
    <>
      <Attribute>
        <CoordinationTitle />
        <CoordinationSkillTable />
      </Attribute>
    </>
  );
}
