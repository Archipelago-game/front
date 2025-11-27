import { theme } from "../../../common/styles/theme/custom-theme.ts";

export async function drawAnimation(
  primaryPath: SVGPathElement,
  secondaryPath: SVGPathElement,
) {
  const pathLength = primaryPath.getTotalLength();
  console.log("draw animation");

  primaryPath.style.stroke = `${theme.palette.label.background.primary}`;
  secondaryPath.style.stroke = `${theme.palette.label.background.secondary}`;

  primaryPath.animate(
    [{ strokeDashoffset: pathLength }, { strokeDashoffset: 0 }],
    {
      duration: 2000,
      easing: "ease-in-out",
      fill: "forwards",
    },
  );

  const secondaryAnim = secondaryPath.animate(
    [{ strokeDashoffset: pathLength }, { strokeDashoffset: 0 }],
    {
      duration: 2000,
      easing: "ease-in-out",
      fill: "forwards",
      delay: 200,
    },
  );

  return secondaryAnim.finished;
}
