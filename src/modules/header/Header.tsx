import { Box } from "@mui/system";
import User from "./User.tsx";
import Logo from "./Logo.tsx";

export default function Header() {
  return (
    <Box
      sx={{
        paddingBlock: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <User />
        <Box
          sx={{
            flex: "1 1 auto",
            alignSelf: "center",
          }}
        >
          <Logo />
        </Box>
      </Box>
    </Box>
  );
}
