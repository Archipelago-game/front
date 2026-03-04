import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { mapRace } from "../../../modules/game-form/consts/map-race.const.ts";
import type { Race } from "../../../modules/game-form/types/form/form.type.ts";
import DiceRollBlock from "../DiceRollBlock.tsx";
import type {
  DiceRollRequest,
  DiceRollResultCallback,
  GenerationStepComponentProps,
} from "../types.ts";
import Carousel, {
  type CarouselItem,
} from "../../../common/components/carousel/Carousel.tsx";
import HumanSilhouette from "../../../modules/game-form/ui/sections/defence/armor/siluets/HumanSilhouette.tsx";
import ImmortalSilhouette from "../../../modules/game-form/ui/sections/defence/armor/siluets/ImmortalSilhouette.tsx";
import CatSilhouette from "../../../modules/game-form/ui/sections/defence/armor/siluets/CatSilhouette.tsx";

function getRaceByD20(value: number): Race {
  if (value === 4) return "immortal";
  if (value === 11) return "cat";
  return "human";
}

const RACE_LIST: CarouselItem<Race>[] = [
  {
    id: "human",
    element: <HumanSilhouette />,
  },
  {
    id: "immortal",
    element: <ImmortalSilhouette />,
  },
  {
    id: "cat",
    element: <CatSilhouette />,
  },
];

export default function StepNature({
  characterData,
  currentValue,
  setCurrentSelectValue,
}: GenerationStepComponentProps) {
  useEffect(() => {
    setCurrentSelectValue({ race: characterData?.race ?? "human" });
  }, []);

  const isDisabledRef = useRef<boolean>(false);

  const diceRequest: DiceRollRequest = { sides: 20, count: 1 };
  const handleDiceResult: DiceRollResultCallback = (values) => {
    const race = getRaceByD20(values[0]);
    setCurrentSelectValue({ race });
    isDisabledRef.current = true;
  };

  return (
    <Box>
      <Box sx={{ maxWidth: "200px", position: "relative", margin: "0 auto" }}>
        <Carousel
          items={RACE_LIST}
          swiperOptions={{
            slidesPerView: 1,
            centeredSlides: true,
            loop: true,
          }}
          value={currentValue?.race}
          onChange={(race) => setCurrentSelectValue({ race })}
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
          {currentValue?.race && (
            <Box component="span">{mapRace[currentValue?.race]}</Box>
          )}
        </Box>
      </Box>

      <DiceRollBlock
        diceRequest={diceRequest}
        onDiceResult={handleDiceResult}
      />
    </Box>
  );
}
