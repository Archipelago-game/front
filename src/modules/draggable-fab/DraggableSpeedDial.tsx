import {
  useState,
  useRef,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
  type JSX,
} from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";

import { useFormDialogContext } from "../form-dialog/use-form-dialog.hook.ts";
import MoralValues from "../game-form/ui/sections/moral-values/MoralValues.tsx";

type ReactDragEvent =
  | ReactMouseEvent<HTMLDivElement>
  | ReactTouchEvent<HTMLDivElement>;

type DragEvent = MouseEvent | TouchEvent;

type SpeedDialActionComponent = {
  icon: string;
  name: string;
  title: string;
  form: () => JSX.Element;
};

// --- Actions ---
const actions: SpeedDialActionComponent[] = [
  { icon: "💎", name: "Ценности", title: "Ценности", form: MoralValues },
];

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

  const callModal = (title: string, Content: () => JSX.Element) => {
    const content = () => <Content />;
    open({
      title,
      content: content,
      onConfirm: () => {},
    });
  };

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
          onClick={() => callModal(action.title, action.form)}
        />
      ))}
    </SpeedDial>
  );
}
