import { Checkbox, Grid } from "@mui/material";

interface Props {
  branch: string;
  name: string;
  level: number;
  description: string;
}

const styles = {
  border: "1px solid black",
};

export default function TalentsGuideLine(props: Props) {
  const { branch, name, level, description } = props;
  return (
    <Grid container size={12}>
      <Grid size={8}>
        {/*  Ветка */}
        <i>{branch}</i>
      </Grid>

      <Grid size={3}>
        {/*  Уровень */}
        уровень {level}
      </Grid>

      <Grid size={1}>
        {/* Checkbox */}
        <Checkbox sx={{ padding: 0 }} />
      </Grid>

      <Grid size={12}>
        {/*  Название */}
        <b>{name}</b>
      </Grid>

      <Grid size={12}>
        {/*  Описание */}
        {description}
      </Grid>
    </Grid>
  );
}
