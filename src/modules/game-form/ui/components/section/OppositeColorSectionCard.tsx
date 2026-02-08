import BaseSectionCard, {
  type DefaultSectionCardProps,
} from "./BaseSectionCard.tsx";
import { useTheme } from "@mui/material/styles";
import SectionHeader from "./SectionHeader.tsx";

export default function OppositeColorSectionCard(
  props: DefaultSectionCardProps,
) {
  const { children, title, ...restProps } = props;

  const theme = useTheme();

  return (
    <BaseSectionCard
      {...restProps}
      backgroundColor={theme.palette.base.surfaceLowered}
      cardContent={{ sx: { color: theme.palette.base.text.onLowered } }}
    >
      <SectionHeader
        title={title}
        color={theme.palette.base.text.onLoweredStrong}
        dividerColor={theme.palette.base.outlineSubtitle}
      />

      {children}
    </BaseSectionCard>
  );
}
