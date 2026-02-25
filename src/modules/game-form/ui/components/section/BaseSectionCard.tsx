import Card, { type CardProps } from "@mui/material/Card";
import CardContent, { type CardContentProps } from "@mui/material/CardContent";

import { useTheme } from "@mui/material/styles";
import { type ReactNode, useState } from "react";

import SectionHeader from "./SectionHeader.tsx";
import { Collapse } from "@mui/material";

export interface DefaultSectionCardProps {
  title?: string;
  children?: ReactNode;
  backgroundColor?: string;
  card?: CardProps;
  cardContent?: Omit<CardContentProps, "children">;
}

export default function BaseSectionCard(props: DefaultSectionCardProps) {
  const { title, children, card, cardContent } = props;
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const backgroundColor = props.backgroundColor
    ? props.backgroundColor
    : theme.palette.base.surfaceBase;

  const { sx: cardSx, ...restCard } = card || {};
  const { sx: cardContentSx, ...restCardContent } = cardContent || {};
  return (
    <Card
      className="card print-solid-section"
      sx={{
        position: "relative",
        backgroundColor: backgroundColor,
        ...cardSx,
      }}
      {...restCard}
    >
      <CardContent
        sx={{ paddingTop: 1, paddingBottom: 1, ...cardContentSx }}
        {...restCardContent}
      >
        <SectionHeader
          title={title}
          dividerColor={theme.palette.base.outline}
          onClick={() => setOpen((prev) => !prev)}
          isExpanded={open}
        />

        <Collapse in={open} timeout="auto" className="print-open-collapse">
          {children}
        </Collapse>
      </CardContent>
    </Card>
  );
}
