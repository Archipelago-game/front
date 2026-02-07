import { Card, CardContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function SubSection() {
  const theme = useTheme();
  return (
    <Card
      sx={{
        background: theme.palette.base.surfaceAccent,
      }}
    >
      <CardContent>
        <div>tEST</div>
      </CardContent>
    </Card>
  );
}
