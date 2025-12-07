import type { FormType } from "../../modules/game-form/types/form/form.type.ts";
import { getHash } from "../../common/utils/get-hash.util.ts";

export async function prepareCharacterExport(data: FormType) {
  const hash = await getHash(JSON.stringify(data));
  return {
    hash,
    data,
  };
}
