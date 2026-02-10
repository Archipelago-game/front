import { useCustomFormContext } from "../../../../../providers/use-custom-context-form.hook.ts";
import HumanSilhouette from "./HumanSilhouette.tsx";
import CatSilhouette from "./CatSilhouette.tsx";
import ImmortalSilhouette from "./ImmortalSilhouette.tsx";
import type { Race } from "../../../../../types/form/form.type.ts";
import type { FC } from "react";
import { useWatch } from "react-hook-form";

const MAPPING_RACE_SILHOUETTE: Record<Race, FC> = {
  human: HumanSilhouette,
  cat: CatSilhouette,
  immortal: ImmortalSilhouette,
};

export default function CurrentSilhouette() {
  const { methods } = useCustomFormContext();
  const race = useWatch({
    control: methods.control,
    name: "race",
  });

  const Silhouette = MAPPING_RACE_SILHOUETTE[race];
  console.log(race);
  return <Silhouette />;
}
