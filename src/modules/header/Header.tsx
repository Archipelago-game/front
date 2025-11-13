import { Stack, Box } from "@mui/material";
import User from "./User.tsx";
import Logo from "./Logo.tsx";
import SidebarMenu from "./SidebarMenu.tsx";

export default function Header() {
  return (
    <Box
      sx={{
        paddingBlock: 2,
      }}
    >
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
