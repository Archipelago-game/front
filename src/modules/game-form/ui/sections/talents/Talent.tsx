import { Box, Button } from "@mui/material";

import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { useFieldArray } from "react-hook-form";
import { useEffect, useMemo } from "react";

import { useConfirmDialogContext } from "../../../../confirm-dialog/use-confirm-dialog.hook.ts";
import { useModal } from "../../../../../app/providers/global-modal/use-modal.hook.ts";
import TalentsGuide from "./TalentsGuide.tsx";
import type { TalentGuideType } from "../../../../../data/talents-guide.ts";
import { groupTalentsByBranch } from "./group-talents-by-branch.utils.ts";
import TalentGroup from "./TalentGroup.tsx";

export default function Talent() {
  const { methods, values, onChange } = useCustomFormContext();
  const { open } = useConfirmDialogContext();
  const { openModal, closeModal } = useModal();

  const { fields, replace, append, remove } = useFieldArray({
    name: "talents.list",
    control: methods.control,
  });

  const groups = useMemo(() => groupTalentsByBranch(fields), [fields]);

  const onChoose = (talent: TalentGuideType) => {
    append({
      name: talent.name,
      branch: talent.branch,
      effect: talent.description,
      rang: talent.rang,
    });
    onChange();
    closeModal();
  };

  const content = () => {
    return <TalentsGuide onChoose={onChoose} />;
  };

  const addTalent = () => {
    openModal({
      content,
      title: "Таланты",
      showConfirmButton: false,
    });
  };

  const deleteTalent = (index: number, name: string) => {
    open({
      message: `ты действительно хочешь удалить талант ${name}?`,
      onConfirm: () => {
        remove(index);
        onChange();
      },
    });
  };

  useEffect(() => {
    if (values) {
      replace(values.talents.list);
    }
  }, [values?.talents.list]);

  return (
    <Box>
      {groups.map((group) => (
        <TalentGroup key={group.branch} group={group} onDelete={deleteTalent} />
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button color="secondary" onClick={addTalent}>
          Добавить
        </Button>
      </Box>
    </Box>
  );
}
