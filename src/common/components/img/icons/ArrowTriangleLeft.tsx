import { Box } from "@mui/system";

interface Props {
  color?: string;
}

export default function ArrowTriangleLeft({ color = "#000" }: Props) {
  return (
    <Box
      sx={{
        width: 0,
        height: 0,
        borderTop: "8px solid transparent",
        borderBottom: "8px solid transparent",
        borderRight: `12px solid ${color}`,
      }}
    ></Box>
  );
}
