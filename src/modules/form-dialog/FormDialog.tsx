import { Dialog, DialogActions, DialogContent, Button } from "@mui/material";
import type { ReactNode } from "react";

export interface FormDialogProps {
  isOpen: boolean;
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
      aria-labelledby="формы"
      aria-describedby="заполнение формы"
      fullWidth={true}
    >
      <DialogContent
        sx={{
          paddingTop: 1,
          paddingInline: 1,
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
