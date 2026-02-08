import { Box, Divider } from "@mui/material";
import SectionTitle from "./SectionTitle.tsx";

interface Props {
  title?: string;
  color?: string;
  dividerColor?: string;
}

export default function SectionHeader({ title, color, dividerColor }: Props) {
  if (!title) {
    return null;
  }
  return (
    <Box>
      <SectionTitle title={title} color={color} />
      {dividerColor && <Divider sx={{ borderColor: dividerColor }} />}
    </Box>
  );
}
