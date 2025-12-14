import type { CustomIconProps } from "../../../../../common/components/icons/custom-icon-props.type.ts";
import type { JSX } from "react";

export type ThreePositionType = "empty" | "full" | "half";
export type StatementColorMapping = Record<ThreePositionType, string>;
export type StatementSingleIcon = ({
  color,
  sx,
}: CustomIconProps) => JSX.Element;
