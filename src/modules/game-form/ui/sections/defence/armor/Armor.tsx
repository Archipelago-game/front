import { Box, Typography } from "@mui/material";
import Head from "./Head.tsx";
import RightHand from "./RightHand.tsx";
import LeftHand from "./LeftHand.tsx";
import LeftLeg from "./LeftLeg.tsx";
import RightLeg from "./LeftLeg.tsx";
import Body from "./Body.tsx";
import { fitContentStyle } from "../side/styles/side-defence.styles.ts";
import { defaultLabelTextStyles } from "../../../components/styles/label.styles.ts";
import { useTheme } from "@mui/material/styles";

const handStyles = {
  gridRow: "1 / 3",
  display: "flex",
  alignItems: "center",
};

export default function Armor() {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: {
            xs: ".8em", // <600px
            sm: ".9em",
            md: ".9em", // ≥960px
          },
          marginBottom: "4px",
          ...defaultLabelTextStyles(theme, "primary"),
        }}
        variant={"h6"}
      >
        Броня
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 70px)",
          gridTemplateRows: "repeat(3, 1fr)",
          gap: 1,
          margin: "0 auto",
          ...fitContentStyle,
        }}
      >
        <Box
          sx={{
            gridColumn: "2 / 3",
            gridRow: 1,
          }}
        >
          <Head />
        </Box>

        <Box sx={{ ...handStyles }}>
          <RightHand />
        </Box>
        <Box sx={{ ...handStyles }}>
          <LeftHand />
        </Box>
        <Box
          sx={{
            gridColumn: "2 / 3",
            gridRow: 2,
          }}
        >
          <Body />
        </Box>
        <Box
          sx={{
            gridColumn: "1 / 2",
            gridRow: 3,
            transform: "translateX(50%)",
          }}
        >
          <RightLeg />
        </Box>
        <Box
          sx={{
            gridColumn: "3 / 4",
            gridRow: 3,
            transform: "translateX(-50%)",
          }}
        >
          <LeftLeg />
        </Box>
      </Box>
    </Box>
  );
}
