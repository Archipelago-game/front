import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import CharacterRulesViewer from "../../global-modules/character-rules/CharacterRulesViewer.tsx";

export default function CharacterRulesPage() {
  const { id } = useParams<{ id?: string }>();

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <CharacterRulesViewer documentId={id} />
    </Box>
  );
}
