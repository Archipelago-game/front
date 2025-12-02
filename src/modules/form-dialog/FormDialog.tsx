import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
} from "@mui/material";
import type { ReactNode } from "react";

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
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="формы"
      aria-describedby="заполнение формы"
      fullWidth={true}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        sx={{
          paddingTop: 1,
          paddingInline: 1,
          overflow: "hidden",
          maxHeight: "100vh",
          overflowY: "auto",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
        }}
      >
        {content()}
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="inherit" size="small">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}
