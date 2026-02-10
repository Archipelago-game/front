import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
} from "@mui/material";
import type { ReactNode } from "react";
import { useTheme } from "@mui/material/styles";

export interface FormDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  title?: string;
  content: () => ReactNode;
}

export function FormDialog({
  isOpen,
  title = "",
  content,
  onConfirm,
  onCancel = () => {},
}: FormDialogProps) {
  const theme = useTheme();
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="формы"
      aria-describedby="заполнение формы"
      fullWidth={true}
    >
      <DialogTitle sx={{ background: theme.palette.base.surfaceBase }}>
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          paddingTop: 1,
          paddingInline: 1,
          overflow: "hidden",
          maxHeight: "100vh",
          overflowY: "auto",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          background: theme.palette.base.surfaceBase,
        }}
      >
        {content()}
      </DialogContent>
      <DialogActions sx={{ background: theme.palette.base.surfaceBase }}>
        <Button onClick={onConfirm} color="primary" size="small">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}
