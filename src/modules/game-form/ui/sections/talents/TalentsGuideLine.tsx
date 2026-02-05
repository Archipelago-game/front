import { Checkbox, Grid } from "@mui/material";
import type { TalentGuideType } from "../../../../../data/talents-guide.ts";
import type { ChangeEvent } from "react";

interface Props {
  talent: TalentGuideType;
  onChange: (values: TalentGuideType) => void;
}

export default function TalentsGuideLine({ talent, onChange }: Props) {
  const { branch, name, rang, focus, description } = talent;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onChange(talent);
    }
  };

  return (
    <Grid
      container
      size={12}
      sx={{
        paddingTop: 1,
        borderTop: "1px solid #eaeaea",
      }}
    >
      <Grid size={8}>
        {/*  Ветка */}
        <i>{branch}</i>
      </Grid>

      <Grid size={3}>
        {/*  Фокус и уровень */}
        🎯 фокус {focus} · ⭐ ур. {rang}
      </Grid>

      <Grid size={1}>
        {/* Checkbox */}
        <Checkbox sx={{ padding: 0 }} onChange={handleChange} />
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
