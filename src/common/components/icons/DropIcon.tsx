import HeartBrokenIcon from "@mui/icons-material/HeartBroken";

interface CustomIconProps {
  color?: string;
}
export default function DropIcon({ color = "#f44336" }: CustomIconProps) {
  return (
    <>
      <HeartBrokenIcon sx={{ color }} />
    </>
  );
}
