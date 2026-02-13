import {
  useState,
  useRef,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
  type FC,
} from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import Notes from "../game-form/ui/sections/notes/Notes.tsx";

import { useFormDialogContext } from "../form-dialog/use-form-dialog.hook.ts";
import MoralValues from "../game-form/ui/sections/moral-values/MoralValues.tsx";

import { printForm } from "../game-form/print-form.ts";

type ReactDragEvent =
  | ReactMouseEvent<HTMLDivElement>
  | ReactTouchEvent<HTMLDivElement>;

type DragEvent = MouseEvent | TouchEvent;

type SpeedDialActionComponent = {
  icon: string;
  name: string;
  action: () => void;
};

export default function DraggableSpeedDial() {
  const dragRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 20, y: 20 });

  // --- Mouse + Touch Drag Handlers ---
  const startPosition = useRef({ x: 0, y: 0 });
  const startMouse = useRef({ x: 0, y: 0 });

  const onDragStart = (e: ReactDragEvent) => {
    const isTouch = "touches" in e;

    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;

    startMouse.current = { x: clientX, y: clientY };
    startPosition.current = { x: position.x, y: position.y };

    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("mouseup", onDragEnd);

    document.addEventListener("touchmove", onDragMove);
    document.addEventListener("touchend", onDragEnd);
  };

  const onDragMove = (e: DragEvent) => {
    const isTouch = "touches" in e;

    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;

    const dx = clientX - startMouse.current.x;
    const dy = clientY - startMouse.current.y;

    setPosition({
      x: startPosition.current.x - dx,
      y: startPosition.current.y - dy,
    });
  };

  const onDragEnd = () => {
    document.removeEventListener("mousemove", onDragMove);
    document.removeEventListener("mouseup", onDragEnd);
    document.removeEventListener("touchmove", onDragMove);
    document.removeEventListener("touchend", onDragEnd);
  };

  const { open } = useFormDialogContext();

  const callModal = (title: string, Content: FC) => {
    open({
      title,
      content: () => <Content />,
      onConfirm: () => {},
    });
  };

  // --- Actions ---
  const actions: SpeedDialActionComponent[] = [
    { icon: "📝", name: "Заметки", action: () => callModal("Заметки", Notes) },
    {
      icon: "💎",
      name: "Ценности",
      action: () => callModal("Ценности", MoralValues),
    },
    {
      icon: "🖨️",
      name: "Печать",
      action: () => printForm(),
    },
  ];

  return (
    <SpeedDial
      ariaLabel="draggable-speed-dial"
      icon={<SpeedDialIcon />}
      direction="up"
      ref={dragRef}
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
      style={{
        position: "fixed",
        right: position.x,
        bottom: position.y,
      }}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={<span style={{ fontSize: 20 }}>{action.icon}</span>}
          title={action.name}
          onClick={action.action}
        />
      ))}
    </SpeedDial>
  );
}
