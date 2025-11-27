import { Stack, Box, Button } from "@mui/material";
import User from "./User.tsx";
import Logo from "./Logo.tsx";
import SidebarMenu from "./SidebarMenu.tsx";
import { useScreenSaver } from "../screen-saver/screen-saver.hook.ts";

export default function Header() {
  const { isShow, setIsShow } = useScreenSaver();
  return (
    <Box
      sx={{
        paddingBlock: 2,
      }}
    >
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          zIndex: 3000,
        }}
        onClick={() => {
          setIsShow(!isShow);
        }}
      >
        SWITCH
      </Button>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Stack spacing={1}>
          <User />
        </Stack>
        <Box
          sx={{
            flex: "1 1 auto",
            alignSelf: "center",
          }}
        >
          <Logo />
        </Box>
        <Stack alignItems="flex-end">
          <SidebarMenu />
        </Stack>
      </Box>
    </Box>
  );
}
