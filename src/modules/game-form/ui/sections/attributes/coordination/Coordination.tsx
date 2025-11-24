import CoordinationTitle from "./CoordinationTitle.tsx";

import Attribute from "../Attribute.tsx";
import CoordinationSkillTableAuto from "./CoordinationSkillTableAuto.tsx";

export default function Coordination() {
  return (
    <Attribute>
      <CoordinationTitle />
      <CoordinationSkillTableAuto />
    </Attribute>
  );
}
