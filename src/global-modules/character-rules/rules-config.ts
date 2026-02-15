export interface RuleDocumentItem {
  id: string;
  title: string;
  path: string;
}

export const RULES_DOCUMENTS: RuleDocumentItem[] = [
  {
    id: "create-character",
    title: "Создание персонажа",
    path: "content/create-character-rules.md",
  },
];
