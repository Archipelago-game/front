export const ERROR_CODE = {
  wrongFile: "WRONG_FILE",
  wrongHash: "WRONG_HASH",
};

import { parseFormJSON } from "../../modules/game-form/types/form/valibot.form.shema.ts";
import type { FormType } from "../../modules/game-form/types/form/form.type.ts";
import { getHash } from "../../common/utils/get-hash.util.ts";

export async function UnpackFileToCharacterForm(file: File) {
  const text = await file.text();

  const json = JSON.parse(text) as { hash: string; data: FormType };

  console.log(json);

  if (!("data" in json) && !("hash" in json)) {
    throw new Error(ERROR_CODE.wrongFile);
  }

  const dataHash = await getHash(JSON.stringify(json.data));
  if (json.hash !== dataHash) {
    throw new Error(ERROR_CODE.wrongHash);
  }

  return parseFormJSON(json.data);
}
