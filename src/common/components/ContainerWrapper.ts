import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

type Props = {
  name?: string;
};

export const ContainerWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "name",
})<Props>(({ name = "wrapper" }) => ({
  containerType: "inline-size",
  containerName: name,
}));
