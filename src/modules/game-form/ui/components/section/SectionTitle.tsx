import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Props {
  title: string;
}

export default function SectionTitle({ title }: Props) {
  const theme = useTheme();
  return (
    <Typography
      variant="h2"
      sx={{
        marginBottom: 1,
        color: theme.palette.base.text.primary,
        textAlign: "left",
        fontSize: {
          md: "1.2em",
          // todo удалить или переделать
          // xs: "1.9em",
          // phablet: "2em",
          // sm: "2.3em",
          // tables: "2.9em",
        },
      }}
    >
      {title}
    </Typography>
  );
}
