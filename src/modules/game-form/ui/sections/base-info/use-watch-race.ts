import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { useWatch } from "react-hook-form";

export function useWatchRace() {
  const { methods } = useCustomFormContext();
  return useWatch({
    control: methods.control,
    name: "race",
  });
}
