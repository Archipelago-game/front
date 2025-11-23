import { useCallback, useState, type ReactNode } from "react";
import { FormDialog, type FormDialogProps } from "./FormDialog.tsx";
import { FormDialogContext } from "./use-form-dialog.hook.ts";

interface Props {
  children: ReactNode;
}

export function FormDialogContextProvider({ children }: Props) {
  const [dialog, setDialog] = useState<FormDialogProps>({
    isOpen: false,
    onConfirm: () => {},
    content: () => <div></div>,
  });

  const open = useCallback((data: Omit<FormDialogProps, "isOpen">) => {
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
    <FormDialogContext.Provider value={{ open }}>
      <FormDialog
        isOpen={dialog.isOpen}
        content={dialog.content}
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
    </FormDialogContext.Provider>
  );
}
