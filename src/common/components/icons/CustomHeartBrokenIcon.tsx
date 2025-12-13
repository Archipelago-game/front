import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import type { CustomIconProps } from "./custom-icon-props.type.ts";

export default function CustomHeartBrokenIcon({
  color = "#f44336",
  sx,
}: CustomIconProps) {
  return <HeartBrokenIcon sx={{ color, ...sx }} />;
}
