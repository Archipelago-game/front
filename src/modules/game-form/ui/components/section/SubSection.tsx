import { Card, CardContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SectionHeader from "./SectionHeader.tsx";
import type { ReactNode } from "react";

interface Props {
  title?: string;
  children?: ReactNode;
}
export default function SubSection({ title, children }: Props) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        position: "relative",
        background: theme.palette.base.surfaceAccent,
      }}
    >
      <CardContent>
        <SectionHeader title={title} />
        {children}
      </CardContent>
    </Card>
  );
}
