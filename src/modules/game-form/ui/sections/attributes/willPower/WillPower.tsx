import Attribute from "../Attribute.tsx";

import WillPowerTitle from "./WillPowerTitle.tsx";
import WillPowerSkillTableAuto from "./WillPowerSkillTableAuto.tsx";

export default function WillPower() {
  return (
    <Attribute>
      <WillPowerTitle />
      <WillPowerSkillTableAuto />
    </Attribute>
  );
}
