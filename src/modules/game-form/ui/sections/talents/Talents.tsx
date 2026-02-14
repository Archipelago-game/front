import Talent from "./Talent.tsx";
import BaseSectionCard from "../../components/section/BaseSectionCard.tsx";
import PrintOn from "../../../../../common/components/print/PrintOn.tsx";
import SectionHeader from "../../components/section/SectionHeader.tsx";
import { useTheme } from "@mui/material/styles";

export default function Talents() {
  const theme = useTheme();
  return (
    <BaseSectionCard>
      <PrintOn>
        <SectionHeader
          title="Таланты"
          dividerColor={theme.palette.base.outline}
        />
      </PrintOn>
      <Talent />
    </BaseSectionCard>
  );
}
