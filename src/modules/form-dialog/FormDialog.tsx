import { Dialog, DialogActions, DialogContent, Button } from "@mui/material";
import type { ReactNode } from "react";

export interface FormDialogProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  content: () => ReactNode;
}

export function FormDialog({
  isOpen,
  content,
  onConfirm,
  onCancel = () => {},
}: FormDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogContent>{content()}</DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="inherit" size="small">
          Отмена
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          autoFocus
          size="small"
        >
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
