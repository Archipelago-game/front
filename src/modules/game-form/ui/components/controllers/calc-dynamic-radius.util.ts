export function calcDynamicRadius(orientation: "column" | "row") {
  let topLeft = 4;
  let topRight = 4;
  let bottomLeft = 4;
  const bottomRight = 4;

  if (orientation === "column") {
    topLeft = 0;
    topRight = 0;
  } else if (orientation === "row") {
    topLeft = 0;
    bottomLeft = 0;
  }

  return {
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
  };
}
