import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";

export const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  minHeight: 40,
  padding: "8px 12px",
  borderTopLeftRadius: "4px",
  borderTopRightRadius: "4px",
  transition: theme.transitions.create(["background-color", "color"], {
    duration: theme.transitions.duration.short,
  }),

  /* ===== default (not selected) ===== */
  backgroundColor: theme.palette.base.surfaceLowered,
  color: theme.palette.base.text.onLowered,

  /* ===== hover (only when NOT selected) ===== */
  "&:hover": {
    backgroundColor: theme.palette.base.surfaceLowered,
    opacity: 0.9,
  },

  /* ===== active (mouse down) ===== */
  "&:active": {
    backgroundColor: theme.palette.base.surfaceBase,
  },

  /* ===== focus-visible (keyboard) ===== */
  "&.Mui-focusVisible": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },

  /* ===== selected ===== */
  "&.Mui-selected": {
    backgroundColor: theme.palette.base.surfaceBase,
    color: theme.palette.base.text.primary,

    /* hover on selected */
    "&:hover": {
      backgroundColor: theme.palette.base.surfaceBase,
      opacity: 0.95,
    },

    /* active on selected */
    "&:active": {
      backgroundColor: theme.palette.base.surfaceBase,
    },
  },

  /* ===== disabled ===== */
  "&.Mui-disabled": {
    opacity: 0.5,
    pointerEvents: "none",
  },
}));
