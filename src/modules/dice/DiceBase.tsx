import { useState } from "react";
import "./dice-base.css";

const faces = [1, 2, 3, 4, 5, 6];

export function DiceBase() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [result, setResult] = useState(1);

  const rollDice = () => {
    const xRot = Math.floor(Math.random() * 4) * 90 + 720; // 2+ оборота для эффекта
    const yRot = Math.floor(Math.random() * 4) * 90 + 720;
    setRotation({ x: xRot, y: yRot });

    // Случайный результат через таймаут, совпадает с окончанием анимации
    setTimeout(() => {
      setResult(faces[Math.floor(Math.random() * 6)]);
    }, 1000);
  };
  console.log(result);
  return (
    <div>
      <div
        className="dice"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <div className="face front">{1}</div>
        <div className="face back">{2}</div>
        <div className="face right">{3}</div>
        <div className="face left">{4}</div>
        <div className="face top">{5}</div>
        <div className="face bottom">{6}</div>
      </div>
      <button onClick={rollDice} style={{ marginTop: 20 }}>
        Бросить кубик
      </button>
    </div>
  );
}
