import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Props {
  title: string;
  color?: string;
}

export default function SectionTitle(props: Props) {
  const theme = useTheme();
  const { title } = props;
  const color = props.color ? props.color : theme.palette.base.text.title;
  return (
    <Typography
      variant="h2"
      component="h2"
      sx={{
        marginBottom: 1,
        color: color,
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
