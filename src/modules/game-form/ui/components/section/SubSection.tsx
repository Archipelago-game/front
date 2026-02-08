import { useTheme } from "@mui/material/styles";
import BaseSectionCard, {
  type DefaultSectionCardProps,
} from "./BaseSectionCard.tsx";

export default function SubSection(props: DefaultSectionCardProps) {
  const theme = useTheme();
  return (
    <BaseSectionCard
      {...props}
      backgroundColor={theme.palette.base.surfaceAccent}
    />
  );
}
