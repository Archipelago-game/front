import { SvgIcon } from "@mui/material";

// #2196f3

interface CustomIconProps {
  color?: string;
}
export default function DropIcon({ color = "#f44336" }: CustomIconProps) {
  return (
    <SvgIcon sx={{ color: color, width: "100%", height: "auto" }}>
      <path
        d="M12,4 C15,4 18,7 18,12 C18,17 12,22 12,22 C12,22 6,17 6,12 C6,7 9,4 12,4 Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}
