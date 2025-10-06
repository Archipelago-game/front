import Attribute from "../Attribute.tsx";

import StrengthTitle from "./StrengthTitle.tsx";
import StrengthSkillTableAuto from "./StrengthSkillTableAuto.tsx";

export default function Strength() {
  return (
    <Attribute>
      <StrengthTitle />
      <StrengthSkillTableAuto />
    </Attribute>
  );
}
