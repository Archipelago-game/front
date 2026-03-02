import { useEffect } from "react";
import { Box } from "@mui/material";

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
import { EffectCoverflow } from "swiper/modules";

function getRaceByD20(value: number): Race {
  if (value === 4) return "immortal";
  if (value === 11) return "cat";
  return "human";
}

// const RACES: Race[] = ["human", "immortal", "cat"];

const RACE_LIST: CarouselItem<Race>[] = [
  {
    id: "human",
    element: <HumanSilhouette imgSx={{ height: "100%", width: "auto" }} />,
  },
  {
    id: "immortal",
    element: <ImmortalSilhouette />,
  },
  {
    id: "cat",
    element: <CatSilhouette />,
  },
  {
    id: "human",
    element: <HumanSilhouette imgSx={{ height: "100%", width: "auto" }} />,
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
  // currentValue,
  setCurrentSelectValue,
}: GenerationStepComponentProps) {
  useEffect(() => {
    setCurrentSelectValue({ race: characterData?.race ?? "human" });
  }, []);

  const diceRequest: DiceRollRequest = { sides: 20, count: 1 };
  const handleDiceResult: DiceRollResultCallback = (values) => {
    const race = getRaceByD20(values[0]);
    setCurrentSelectValue({ race });
  };

  return (
    <Box>
      <Box
        sx={{
          width: "500px",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            position: "relative",
            "&::before": {
              left: 0,
            },
            "&::after": {
              right: 0,
            },
          }}
        >
          <Carousel
            items={RACE_LIST}
            onClick={(id) => setCurrentSelectValue(id)}
            swiperProps={{
              modules: [EffectCoverflow],
              effect: "coverflow",
              centeredSlides: true,
              loop: true,
              grabCursor: true,
              coverflowEffect: {
                rotate: 40,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              },
            }}
          />
        </Box>
      </Box>

      <DiceRollBlock
        diceRequest={diceRequest}
        onDiceResult={handleDiceResult}
      />
    </Box>
  );
}
