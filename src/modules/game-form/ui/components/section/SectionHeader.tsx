import { Box, Divider } from "@mui/material";
import SectionTitle from "./SectionTitle.tsx";
import AccordionHeader from "./AccordionHeader.tsx";

interface Props {
  title?: string;
  color?: string;
  dividerColor?: string;
  onClick?: () => void;
}

export default function SectionHeader({
  title,
  color,
  dividerColor,
  onClick,
}: Props) {
  if (!title) {
    return null;
  }
  return (
    <Box mb={2}>
      {onClick && (
        <AccordionHeader onClick={onClick}>
          <SectionTitle title={title} color={color} />
        </AccordionHeader>
      )}

      {!onClick && <SectionTitle title={title} color={color} />}

      {dividerColor && <Divider sx={{ borderColor: dividerColor }} />}
    </Box>
  );
}
