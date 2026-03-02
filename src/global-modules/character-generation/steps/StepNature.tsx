import { useEffect } from "react";
import { Button, Box } from "@mui/material";
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

const RACES: Race[] = ["human", "immortal", "cat"];

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

  const diceRequest: DiceRollRequest = { sides: 20, count: 1 };
  const handleDiceResult: DiceRollResultCallback = (values) => {
    const race = getRaceByD20(values[0]);
    setCurrentSelectValue({ race });
  };

  return (
    <Box>
      <Box sx={{ height: "50%", position: "relative" }}>
        <Carousel items={RACE_LIST} slidesToShow={1} />
      </Box>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2, mb: 2 }}>
        {RACES.map((race) => (
          <Button
            key={race}
            variant={currentValue?.race === race ? "contained" : "outlined"}
            onClick={() => setCurrentSelectValue({ race })}
          >
            {mapRace[race]}
          </Button>
        ))}
      </Box>
      <DiceRollBlock
        diceRequest={diceRequest}
        onDiceResult={handleDiceResult}
      />
    </Box>
  );
}
