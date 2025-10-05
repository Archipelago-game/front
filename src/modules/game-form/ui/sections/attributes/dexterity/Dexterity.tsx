import DexterityTitle from "./DexterityTitle.tsx";

import Attribute from "../Attribute.tsx";
import DexteritySkillTableAuto from "./DexteritySkillsTableAuto.tsx";

export default function Dexterity() {
  return (
    <>
      <Attribute>
        <DexterityTitle />
        <DexteritySkillTableAuto />
      </Attribute>
    </>
  );
}
