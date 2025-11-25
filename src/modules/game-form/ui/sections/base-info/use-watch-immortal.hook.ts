import { useWatch } from "react-hook-form";
import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";

export function useWatchImmortal(): boolean {
  const { methods } = useCustomFormContext();
  return useWatch({
    control: methods.control,
    name: "immortal.checked",
  });
}
