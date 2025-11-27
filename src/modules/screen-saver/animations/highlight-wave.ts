export async function HighlightWave(path: SVGPathElement) {
  path.style.opacity = "0";
  path.style.fill = "url(#highlightWave)";
  return path.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 4000,
    easing: "linear",
    iterations: Infinity,
  });
}
