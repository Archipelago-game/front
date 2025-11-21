import { useState, useRef } from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";

export default function DraggableSpeedDial() {
  const dragRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });

  // --- Mouse + Touch Drag Handlers ---
  const startPosition = useRef({ x: 0, y: 0 });
  const startMouse = useRef({ x: 0, y: 0 });

  const onDragStart = (e: any) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    startMouse.current = { x: clientX, y: clientY };
    startPosition.current = { x: position.x, y: position.y };

    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("mouseup", onDragEnd);

    document.addEventListener("touchmove", onDragMove);
    document.addEventListener("touchend", onDragEnd);
  };

  const onDragMove = (e: any) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const dx = clientX - startMouse.current.x;
    const dy = clientY - startMouse.current.y;

    setPosition({
      x: startPosition.current.x + dx,
      y: startPosition.current.y + dy,
    });
  };

  const onDragEnd = () => {
    document.removeEventListener("mousemove", onDragMove);
    document.removeEventListener("mouseup", onDragEnd);
    document.removeEventListener("touchmove", onDragMove);
    document.removeEventListener("touchend", onDragEnd);
  };

  // --- Actions ---
  const actions = [
    { icon: "📝", name: "Заметки" },
    { icon: "💎", name: "Ценности" },
  ];

  return (
    <div
      ref={dragRef}
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 9999,
      }}
    >
      <SpeedDial
        ariaLabel="draggable-speed-dial"
        icon={<SpeedDialIcon />}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={<span style={{ fontSize: 20 }}>{action.icon}</span>}
            title={action.name}
            onClick={() => console.log(action.name)}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
