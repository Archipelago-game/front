import CustomLabel from "../../components/CustomLabel.tsx";

import { Box, useMediaQuery } from "@mui/material";
import BaseField from "../../components/BaseField.tsx";
import { useWatchImmortal } from "../base-info/use-watch-immortal.hook.ts";

const styles = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.2em",
};

export default function Experience() {
  const isBelow530 = useMediaQuery("(max-width: 530px)");

  const isImmortal = useWatchImmortal();
  return (
    <CustomLabel label={{ text: "Опыт" }} sx={{ flex: "1 1 1" }}>
      <Box
        sx={{
          width: isBelow530 ? "100%" : isImmortal ? "100%" : "300px",
          ...styles,
        }}
      >
        <BaseField
          fieldName="experience.total"
          label={{
            color: "secondary",
            text: "Всего",
          }}
          orientation="row"
        />

        <BaseField
          fieldName="experience.used"
          label={{
            color: "secondary",
            text: "Исп.",
          }}
          orientation="row"
        />

        {isImmortal && (
          <>
            <BaseField
              fieldName="immortal.experience.salted"
              label={{
                color: "secondary",
                text: "Засоленный",
              }}
              orientation="row"
            />

            <BaseField
              fieldName="immortal.experience.deferred"
              label={{
                color: "secondary",
                text: "Отложенный",
              }}
              orientation="row"
            />
          </>
        )}
      </Box>
    </CustomLabel>
  );
}
