import { Typography } from "@mui/material";
interface Props {
  title: string;
}

export default function SectionTitle({ title }: Props) {
  return (
    <Typography
      variant="h4"
      sx={{
        textAlign: "center",
        fontSize: {
          xs: "1.9em",
          phablet: "2em",
          sm: "2.3em",
          tables: "2.9em",
        },
      }}
    >
      {title}
    </Typography>
  );
}
