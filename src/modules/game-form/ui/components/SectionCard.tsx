import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import SectionTitle from "./SectionTitle.tsx";
import { useTheme } from "@mui/material/styles";
import type { ReactNode } from "react";
import { Box, Divider } from "@mui/material";

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
          <Box>
            <SectionTitle title={title} />
            <Divider sx={{ borderColor: theme.palette.base.outline }} />
          </Box>
        )}
        {children}
      </CardContent>
    </Card>
  );
}
