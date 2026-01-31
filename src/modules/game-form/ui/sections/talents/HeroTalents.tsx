import { useEffect } from "react";

import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { useFieldArray } from "react-hook-form";
import { useModal } from "../../../../../app/providers/global-modal/use-modal.hook.ts";
import { useTalentsGuideFilter } from "./use-talents-filter.hook.ts";

import { Box, Button } from "@mui/material";
import HeroTalentsView from "./HeroTalentsView.tsx";
import TalentsFilterForm from "./TalentsFilterForm.tsx";
import TalentsGuide from "./TalentsGuide.tsx";

import {
  adaptTalentFields,
  talentGuideToTalent,
} from "./talent-converters.utils.ts";
import {
  type TalentGuideType,
  talentsGuide,
} from "../../../../../data/talents-guide.ts";
import { useConfirmDialogContext } from "../../../../confirm-dialog/use-confirm-dialog.hook.ts";

export default function HeroTalents() {
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
  }, []);

  return (
    <Box width={"fit-content"}>
      <TalentsFilterForm
        talents={adaptTalentFields(fields)}
        onFormChange={handleFilterChange}
      />
      <HeroTalentsView fields={filteredTalents} onDelete={deleteTalent} />
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
