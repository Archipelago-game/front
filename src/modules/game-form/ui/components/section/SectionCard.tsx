import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { useTheme } from "@mui/material/styles";
import type { ReactNode } from "react";

import SectionHeader from "./SectionHeader.tsx";

interface Props {
  title?: string;
  children?: ReactNode;
}

export default function SectionCard(props: Props) {
  const { title, children } = props;
  const theme = useTheme();
  return (
    <Card
      sx={{
        backgroundColor: theme.palette.base.surfaceBase,
      }}
    >
      <CardContent sx={{ paddingTop: 1 }}>
        {title && (
          <SectionHeader
            title={title}
            dividerColor={theme.palette.base.outline}
          />
        )}
        {children}
      </CardContent>
    </Card>
  );
}
