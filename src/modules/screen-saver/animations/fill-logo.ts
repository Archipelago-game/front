export async function fillInAnimation(path: SVGPathElement) {
  path.style.opacity = "0";
  path.style.fill = "url(#fillGradient)";
  const animation = path.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 2000,
    easing: "ease-in-out",
    fill: "forwards",
    delay: 1000,
  });
  return animation.finished;
}
