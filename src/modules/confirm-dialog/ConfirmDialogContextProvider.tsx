import { type ReactNode, useCallback, useState } from "react";
import { ConfirmDialogContext } from "./use-confirm-dialog.hook.ts";
import { ConfirmDialog, type ConfirmDialogProps } from "./ConfirmDialog.tsx";

interface Props {
  children: ReactNode;
}

export function ConfirmDialogContextProvider({ children }: Props) {
  const [dialog, setDialog] = useState<ConfirmDialogProps>({
    isOpen: false,
    message: "",
    onConfirm: () => {},
  });

  const open = useCallback((data: Omit<ConfirmDialogProps, "isOpen">) => {
    setDialog({
      isOpen: true,
      ...data,
    });
  }, []);

  const close = () => {
    setDialog((prevState) => ({
      ...prevState,
      isOpen: false,
    }));
  };

  return (
    <ConfirmDialogContext.Provider value={{ open }}>
      <ConfirmDialog
        isOpen={dialog.isOpen}
        message={dialog.message}
        onConfirm={() => {
          dialog.onConfirm();
          close();
        }}
        onCancel={() => {
          dialog?.onCancel?.();
          close();
        }}
      />
      {children}
    </ConfirmDialogContext.Provider>
  );
}
