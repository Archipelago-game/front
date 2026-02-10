import { Stack } from "@mui/material";
import Armor from "./Armor.tsx";
import ArmorProperty from "./ArmorProperty.tsx";

export default function ArmorSection() {
  return (
    <Stack spacing={1}>
      <Armor />
      <ArmorProperty />
    </Stack>
  );
}
