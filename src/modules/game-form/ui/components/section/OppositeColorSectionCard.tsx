import BaseSectionCard, {
  type DefaultSectionCardProps,
} from "./BaseSectionCard.tsx";
import { useTheme } from "@mui/material/styles";

export default function OppositeColorSectionCard(
  props: DefaultSectionCardProps,
) {
  const theme = useTheme();
  return (
    <BaseSectionCard
      {...props}
      backgroundColor={theme.palette.base.surfaceLowered}
      cardContent={{ sx: { color: theme.palette.base.text.onLowered } }}
    />
  );
}
