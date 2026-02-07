import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

interface Props {
  title: string;
}

export default function SubTitle({ title }: Props) {
  const theme = useTheme();

  return (
    <Typography
      component="h3"
      sx={{
        marginBottom: 1,
        color: theme.palette.base.text.primary,
        textAlign: "left",
        fontWeight: 200,
        fontSize: "1em",
      }}
    >
      {title}
    </Typography>
  );
}
