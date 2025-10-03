import { Box } from "@mui/material";
import DexterityTitle from "./DexterityTitle.tsx";
import DexteritySkillsTable from "./DexteritySkillsTable.tsx";

export default function Dexterity() {
  return (
    <>
      <Box>
        <DexterityTitle />
        <DexteritySkillsTable />
      </Box>
    </>
  );
}
