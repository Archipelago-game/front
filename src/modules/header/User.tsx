import { Box, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();

  return (
    <Box>
      <IconButton onClick={() => navigate("/auth-done")}>
        <AccountCircle
          sx={{
            fontSize: "40px",
          }}
        />
      </IconButton>
    </Box>
  );
}
