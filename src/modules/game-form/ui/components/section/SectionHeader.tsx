import { Box, Divider, IconButton } from "@mui/material";
import SectionTitle from "./SectionTitle.tsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
    <Box mb={2}>
      <SectionTitle title={title} color={color} />

      <IconButton onClick={() => {}}>
        <ExpandMoreIcon />
      </IconButton>

      {dividerColor && <Divider sx={{ borderColor: dividerColor }} />}
    </Box>
  );
}
