export const buttonDeleteStyles = {
  transition: "all .2s",
  "&:hover": {
    color: "error.main",
    transform: "scale(1.1)",
  },
  "&:active": {
    color: "error.dark",
    transform: "scale(0.95)",
  },
  "&:focus-visible": {
    outline: "1px solid",
    outlineColor: "error.light",
  },
  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
};
