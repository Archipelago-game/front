import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const DefenceContainer = styled(Box)(() => ({
  display: "grid",
  gridTemplatesColumns: "repeat(auto-fit, minmax(min(100%, 206px), 1fr))",

  "@container defenceWrapper (max-width: 600px)": {
    gridTemplatesColumns: "1fr",
  },
}));
