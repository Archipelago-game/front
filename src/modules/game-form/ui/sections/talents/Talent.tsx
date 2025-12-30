import { useEffect } from "react";

import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { useFieldArray } from "react-hook-form";
import { useModal } from "../../../../../app/providers/global-modal/use-modal.hook.ts";
import { useTalentsGuideFilter } from "./use-talents-filter.hook.ts";

import { Box, Button } from "@mui/material";
import TalentsView from "./TalentLayout.tsx";
import TalentsGuideFilterForm from "./TalentsGuideFilterForm.tsx";
import TalentsGuide from "./TalentsGuide.tsx";

import {
  adaptTalentFieldsToGuides,
  talentGuideToTalent,
} from "./talent-converters.utils.ts";
import type { TalentGuideType } from "../../../../../data/talents-guide.ts";

// todo обновлять при добавлении таланта
export default function Talent() {
  const { methods, values, onChange } = useCustomFormContext();
  const { openModal, closeModal } = useModal();

  const { fields, replace, append, remove } = useFieldArray({
    name: "talents.list",
    control: methods.control,
  });

  const { filteredTalents, handleFilterChange } = useTalentsGuideFilter(
    adaptTalentFieldsToGuides(fields),
  );

  const onChoose = (talent: TalentGuideType) => {
    append({ ...talentGuideToTalent(talent) });
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

  const onDelete = (index: number, name: string) => {
    openModal({
      content,
      title: "Таланты",
      showConfirmButton: false,
    });
    remove(index);
  };

  useEffect(() => {
    if (values) {
      replace(values.talents.list);
    }
  }, [values?.talents.list]);

  return (
    <Box width={"fit-content"}>
      <TalentsGuideFilterForm
        talents={adaptTalentFieldsToGuides(fields)}
        onFormChange={handleFilterChange}
      />
      <TalentsView fields={filteredTalents} onDelete={onDelete} />
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
