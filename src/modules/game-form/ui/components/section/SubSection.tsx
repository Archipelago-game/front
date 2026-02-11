import { useTheme } from "@mui/material/styles";
import BaseSectionCard, {
  type DefaultSectionCardProps,
} from "./BaseSectionCard.tsx";

export default function SubSection(props: DefaultSectionCardProps) {
  const theme = useTheme();
  const { card, ...rest } = props;
  const { sx: cardSx, ...restCard } = card || {};
  return (
    <BaseSectionCard
      {...rest}
      card={{
        ...restCard,
        sx: {
          paddingTop: "20px",
          ...cardSx,
        },
      }}
      backgroundColor={theme.palette.base.surfaceAccent}
    />
  );
}
