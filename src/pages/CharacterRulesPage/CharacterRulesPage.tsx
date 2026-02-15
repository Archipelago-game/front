import { Box, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import CharacterRulesViewer from "../../global-modules/character-rules/CharacterRulesViewer.tsx";

export default function CharacterRulesPage() {
  const { id } = useParams<{ id?: string }>();
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 3,
        minHeight: "100%",
        backgroundColor: theme.palette.base.background,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          maxWidth: 800,
          mx: "auto",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <CharacterRulesViewer documentId={id} />
      </Paper>
    </Box>
  );
}
