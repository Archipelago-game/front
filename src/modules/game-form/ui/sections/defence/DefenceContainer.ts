import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const DefenceContainer = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 206px",
  gap: "8px",

  "@container defenceWrapper (max-width: 417px)": {
    gridTemplateColumns: "1fr",
  },
}));
