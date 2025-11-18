import { Checkbox, Grid } from "@mui/material";

interface Props {
  branch: string;
  name: string;
  level: number;
  description: string;
}
export default function TalentsGuideLine(props: Props) {
  const { branch, name, level, description } = props;
  return (
    <Grid container size={12}>
      <Grid size={12}>
        {/*  Ветка */}
        {branch}
      </Grid>

      <Grid size={9}>
        {/*  Название */}
        {name}
      </Grid>

      <Grid size={2}>
        {/*  Уровень */}
        {level}
      </Grid>

      <Grid size={2}>
        {/*  Уровень */}
        <Checkbox />
      </Grid>

      <Grid size={12}>
        {/*  Описание */}
        {description}
      </Grid>
    </Grid>
  );
}
