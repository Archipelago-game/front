import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import DiceRollBlock from "../DiceRollBlock.tsx";
import type {
  DiceRollRequest,
  DiceRollResultCallback,
  GenerationStepComponentProps,
} from "../types.ts";
import {
  HOMELAND_OPTIONS,
  CAT_HOMELAND_OPTION,
  getHomelandByD20,
  type HomelandCarouselItem,
} from "../consts/homeland-options.const.tsx";
import Carousel from "../../../common/components/carousel/Carousel.tsx";

function getVisibleOptions(race?: string): HomelandCarouselItem[] {
  if (race === "cat") return [CAT_HOMELAND_OPTION, ...HOMELAND_OPTIONS];
  return HOMELAND_OPTIONS;
}

function getInitialHomeland(characterData?: {
  race?: string;
  homeland?: string;
}): HomelandCarouselItem | null {
  if (characterData?.race === "cat" && !characterData?.homeland) {
    return CAT_HOMELAND_OPTION;
  }

  const options = getVisibleOptions(characterData?.race);
  if (!characterData?.homeland) {
    return options[0];
  }
  return options.find((o) => o.displayName === characterData.homeland) ?? null;
}

export default function StepHomeland({
  characterData,
  isSubmitting,
  currentValue,
  setCurrentSelectValue,
}: GenerationStepComponentProps) {
  const isDisabledRef = useRef<boolean>(false);

  const isCat = characterData?.race === "cat";
  const visibleOptions = getVisibleOptions(characterData?.race);

  const diceRequest: DiceRollRequest = { sides: 20, count: 1 };
  const handleDiceResult: DiceRollResultCallback = (values) => {
    const id = getHomelandByD20(values[0]);
    const option = visibleOptions.find((o) => o.id === id);
    if (option) {
      handleSelect(option);
      isDisabledRef.current = true;
    }
  };

  useEffect(() => {
    const initialValue = getInitialHomeland(characterData);
    if (initialValue) {
      handleSelect(initialValue);
    }
  }, []);

  const handleSelect = (option: HomelandCarouselItem) => {
    setCurrentSelectValue({
      homeland: option.displayName,
      languages: option.language,
    });
  };

  return (
    <Box>
      <Box sx={{ maxWidth: "200px", position: "relative", margin: "0 auto" }}>
        <Carousel
          items={visibleOptions}
          swiperOptions={{
            slidesPerView: 1,
            centeredSlides: true,
            loop: true,
          }}
          value={currentValue?.homeland}
          onChange={(homeland) => {
            const option = visibleOptions.find(
              (option) => option.id === homeland,
            );
            if (option) {
              handleSelect(option);
            }
          }}
          disabled={isDisabledRef.current}
        />
        <Box
          sx={{
            paddingBlock: 1,
            textAlign: "center",
            fontSize: "1.1rem",
            fontWeight: "900",
          }}
        >
          {currentValue?.homeland && (
            <Box component="span">{currentValue?.homeland}</Box>
          )}
        </Box>
      </Box>

      {isCat && (
        <Typography sx={{ mt: 1, mb: 1 }} color="text.secondary">
          Кошки родом с Островов Кошек. Вы можете выбрать родину для бэкстори;
          талант родины при этом не добавляется.
        </Typography>
      )}

      <DiceRollBlock
        diceRequest={diceRequest}
        onDiceResult={handleDiceResult}
        disabled={isSubmitting}
      />
    </Box>
  );
}
