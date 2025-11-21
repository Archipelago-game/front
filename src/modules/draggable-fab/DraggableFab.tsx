import { useState, useRef, type MouseEvent as ReactMouseEvent } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function DraggableFab() {
  const [pos, setPos] = useState({ x: 20, y: 20 });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: ReactMouseEvent<HTMLButtonElement>) => {
    dragging.current = true;

    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;

    setPos({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handleMouseUp = () => {
    dragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    dragging.current = true;

    const touch = e.touches[0];

    offset.current = {
      x: touch.clientX - pos.x,
      y: touch.clientY - pos.y,
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!dragging.current) return;

    e.preventDefault(); // отключает скролл во время перетаскивания

    const touch = e.touches[0];

    setPos({
      x: touch.clientX - offset.current.x,
      y: touch.clientY - offset.current.y,
    });
  };

  const handleTouchEnd = () => {
    dragging.current = false;
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  const handleClick = () => {
    console.log("handleClick");
  };

  return (
    <Fab
      color="primary"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
      sx={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        zIndex: 2000,
        cursor: "grab",
      }}
    >
      <AddIcon />
    </Fab>
  );
}
