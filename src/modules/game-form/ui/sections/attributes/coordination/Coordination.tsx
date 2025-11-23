import CoordinationTitle from "./CoordinationTitle.tsx";

import Attribute from "../Attribute.tsx";
import CoordinationSkillTableAuto from "./CoordinationSkillTableAuto.tsx";
import { useCustomFormContext } from "../../../../providers/use-custom-context-form.hook.ts";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";

export default function Coordination() {
  const { methods, onChange } = useCustomFormContext();

  const value = useWatch({
    control: methods.control,
    name: "stats.coordination.value",
  });

  const expertise = useWatch({
    control: methods.control,
    name: "stats.coordination.firearms.expertise",
  });

  useEffect(() => {
    const result = (Number(value) || 0) + (Number(expertise) || 0);

    methods.setValue("stats.coordination.firearms.OZ", result);
    onChange();
  }, [value, expertise]);

  return (
    <Attribute>
      <CoordinationTitle />
      <CoordinationSkillTableAuto />
    </Attribute>
  );
}
