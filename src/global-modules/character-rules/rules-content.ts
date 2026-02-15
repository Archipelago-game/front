import createCharacterRules from "./content/create-character-rules.md?raw";

const RULE_CONTENT_BY_ID: Record<string, string> = {
  "create-character": createCharacterRules as string,
};

export function getRuleContent(id: string): string | undefined {
  return RULE_CONTENT_BY_ID[id];
}
