import { Box, Button } from "@mui/material";

import { useCustomFormContext } from "../../../providers/use-custom-context-form.hook.ts";
import { useFieldArray } from "react-hook-form";
import { useEffect } from "react";

import { useModal } from "../../../../../app/providers/global-modal/use-modal.hook.ts";
import TalentsGuide from "./TalentsGuide.tsx";
import type { TalentGuideType } from "../../../../../data/talents-guide.ts";
import CharacterTalentsFiltered from "./CharacterTalentsFiltered.tsx";
import { talentGuideToTalent } from "./talent-converters.utils.ts";

// todo обновлять при добавлении таланта
export default function Talent() {
  const { methods, values, onChange } = useCustomFormContext();
  const { openModal, closeModal } = useModal();

  const { fields, replace, append } = useFieldArray({
    name: "talents.list",
    control: methods.control,
  });

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

  const handleTalentClick = () => {
    // Ничего не делаем - только отображение
  };

  useEffect(() => {
    if (values) {
      replace(values.talents.list);
    }
  }, [values?.talents.list]);

  return (
    <Box width={"fit-content"}>
      <CharacterTalentsFiltered talents={fields} onChoose={handleTalentClick} />
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
