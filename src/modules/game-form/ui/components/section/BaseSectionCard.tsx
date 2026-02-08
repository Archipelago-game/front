import Card from "@mui/material/Card";
import CardContent, { type CardContentProps } from "@mui/material/CardContent";

import { useTheme } from "@mui/material/styles";
import type { ReactNode } from "react";

import SectionHeader from "./SectionHeader.tsx";

export interface DefaultSectionCardProps {
  title?: string;
  children?: ReactNode;
  backgroundColor?: string;
  cardContent?: Omit<CardContentProps, "children">;
}

export default function BaseSectionCard(props: DefaultSectionCardProps) {
  const { title, children, cardContent } = props;
  const theme = useTheme();
  const backgroundColor = props.backgroundColor
    ? props.backgroundColor
    : theme.palette.base.surfaceBase;

  const { sx: cardContentSx, ...restCardContent } = cardContent || {};
  return (
    <Card
      sx={{
        position: "relative",
        backgroundColor: backgroundColor,
      }}
    >
      <CardContent
        sx={{ paddingTop: 1, paddingBottom: 1, ...cardContentSx }}
        {...restCardContent}
      >
        <SectionHeader
          title={title}
          dividerColor={theme.palette.base.outline}
        />
        {children}
      </CardContent>
    </Card>
  );
}
