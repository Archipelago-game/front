import Attribute from "../Attribute.tsx";
import StrengthSkillTable from "./StrengthSkillTable.tsx";
import StrengthTitle from "./StrengthTitle.tsx";

export default function Strength() {
  return (
    <Attribute>
      <StrengthTitle />
      <StrengthSkillTable />
    </Attribute>
  );
}
