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
          xs: "1.2em",
        },
      }}
    >
      {title}
    </Typography>
  );
}
