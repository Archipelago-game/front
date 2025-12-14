import type { ThreePositionType } from "./three-position-box.type.ts";

const POSITION_ORDER: ThreePositionType[] = ["empty", "full", "half"];
export function cycleValue(value: ThreePositionType) {
  return POSITION_ORDER[
    (POSITION_ORDER.indexOf(value) + 1) % POSITION_ORDER.length
  ];
}
