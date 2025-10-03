import DexterityTitle from "./DexterityTitle.tsx";
import DexteritySkillsTable from "./DexteritySkillsTable.tsx";
import Attribute from "../Attribute.tsx";

export default function Dexterity() {
  return (
    <>
      <Attribute>
        <DexterityTitle />
        <DexteritySkillsTable />
      </Attribute>
    </>
  );
}
