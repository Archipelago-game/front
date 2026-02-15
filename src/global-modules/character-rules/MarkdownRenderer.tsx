import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Box } from "@mui/material";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <Box
      component="div"
      sx={{
        "& h1": { typography: "h4", mt: 2, mb: 1 },
        "& h2": { typography: "h5", mt: 2, mb: 1 },
        "& h3": { typography: "h6", mt: 1.5, mb: 0.5 },
        "& table": { borderCollapse: "collapse", width: "100%", my: 1 },
        "& th, & td": {
          border: "1px solid",
          borderColor: "divider",
          px: 1,
          py: 0.5,
        },
        "& ul, & ol": { pl: 2 },
      }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </Box>
  );
}
