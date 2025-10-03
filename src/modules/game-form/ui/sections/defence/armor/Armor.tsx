import CustomLabel from "../../../components/CustomLabel.tsx";
import { Box } from "@mui/material";
import Head from "./Head.tsx";
import RightHand from "./RightHand.tsx";
import LeftHand from "./LeftHand.tsx";
import LeftLeg from "./LeftLeg.tsx";
import RightLeg from "./LeftLeg.tsx";
import Body from "./Body.tsx";

const handStyles = {
  gridRow: "1 / 3",
  display: "flex",
  alignItems: "center",
};

export default function Armor() {
  return (
    <CustomLabel
      label={{
        text: "Броня",
      }}
      orientation="column"
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          gap: 1,
          marginTop: "4px",
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

        <Box sx={handStyles}>
          <RightHand />
        </Box>
        <Box sx={handStyles}>
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
    </CustomLabel>
  );
}
