import { useEffect, useMemo } from "react";

import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { useFieldArray } from "react-hook-form";
import { useModal } from "../../../../../app/providers/global-modal/use-modal.hook.ts";
import { useTalentsGuideFilter } from "./filter/use-talents-filter.hook.ts";

import { Box, Button } from "@mui/material";

import TalentsFilterForm from "./filter/TalentsFilterForm.tsx";
import TalentsGuide from "./talents-guide/TalentsGuide.tsx";

import {
  adaptTalentFields,
  talentGuideToTalent,
} from "./utils/talent-converters.utils.ts";
import {
  type TalentGuideType,
  talentsGuide,
} from "../../../../../data/talents-guide.ts";
import { useConfirmDialogContext } from "../../../../confirm-dialog/use-confirm-dialog.hook.ts";
import { groupTalentsByBranch } from "./utils/group-talents-by-branch.utils.ts";
import TalentGroupView from "./TalentGroupView.tsx";

export default function TalentList() {
  const { methods, values, onChange } = useCustomFormContext();
  const { openModal, closeModal } = useModal();
  const { open } = useConfirmDialogContext();

  const { fields, replace, append, remove } = useFieldArray({
    name: "talents.list",
    control: methods.control,
  });

  const { filteredTalents, handleFilterChange } = useTalentsGuideFilter(
    adaptTalentFields(fields),
  );

  const groups = useMemo(
    () => groupTalentsByBranch(filteredTalents),
    [filteredTalents],
  );

  const onChoose = (talent: TalentGuideType) => {
    append({ ...talentGuideToTalent(talent) });
    onChange();
    closeModal();
  };

  const content = () => {
    return <TalentsGuide onChoose={onChoose} talents={talentsGuide} />;
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
    <Box width={"fit-content"}>
      <TalentsFilterForm
        talents={adaptTalentFields(fields)}
        onFormChange={handleFilterChange}
      />
      {groups.map((group) => (
        <TalentGroupView
          key={group.branch}
          group={group}
          onDelete={deleteTalent}
        />
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={addTalent}>Добавить</Button>
      </Box>
    </Box>
  );
}
