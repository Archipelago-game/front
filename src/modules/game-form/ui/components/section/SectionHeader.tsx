import { Box, Divider } from "@mui/material";
import SectionTitle from "./SectionTitle.tsx";

interface Props {
  title?: string;
  dividerColor?: string;
}

export default function SectionHeader({ title, dividerColor }: Props) {
  if (!title) {
    return null;
  }
  return (
    <Box>
      <SectionTitle title={title} />
      {dividerColor && <Divider sx={{ borderColor: dividerColor }} />}
    </Box>
  );
}
