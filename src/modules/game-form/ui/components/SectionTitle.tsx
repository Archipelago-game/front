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
      }}
    >
      {title}
    </Typography>
  );
}
