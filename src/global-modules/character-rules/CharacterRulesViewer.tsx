import { Box, Typography } from "@mui/material";
import { RULES_DOCUMENTS } from "./rules-config.ts";
import { getRuleContent } from "./rules-content.ts";
import MarkdownRenderer from "./MarkdownRenderer.tsx";

interface CharacterRulesViewerProps {
  documentId?: string;
}

export default function CharacterRulesViewer({
  documentId,
}: CharacterRulesViewerProps) {
  if (RULES_DOCUMENTS.length === 0) {
    return (
      <Typography color="text.secondary">Нет доступных документов.</Typography>
    );
  }
  const doc = documentId
    ? RULES_DOCUMENTS.find((d) => d.id === documentId)
    : RULES_DOCUMENTS[0];
  const content = doc ? getRuleContent(doc.id) : undefined;

  if (!doc) {
    return <Typography color="text.secondary">Документ не найден.</Typography>;
  }
  if (!content) {
    return (
      <Typography color="text.secondary">Содержимое недоступно.</Typography>
    );
  }
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {doc.title}
      </Typography>
      <MarkdownRenderer content={content} />
    </Box>
  );
}
