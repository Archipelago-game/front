import Attribute from "../Attribute.tsx";
import WillPowerSkillTable from "./WillPowerSkillTable.tsx";
import WillPowerTitle from "./WillPowerTitle.tsx";

export default function WillPower() {
  return (
    <Attribute>
      <WillPowerTitle />
      <WillPowerSkillTable />
    </Attribute>
  );
}
