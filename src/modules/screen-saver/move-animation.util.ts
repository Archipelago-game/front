export function moveAnimation(ref: HTMLDivElement) {
  const moveAnim = ref.animate(
    [
      {
        transform: "translate(-50%, -50%) scale(1)",
      },
      {
        transform: "translate(-100%, -100%) scale(0.2)",
      },
    ],
    {
      duration: 2000,
      easing: "ease-in-out",
      fill: "forwards",
    },
  );

  let fadeAnim: Animation | null = null;

  moveAnim.onfinish = () => {
    fadeAnim = ref.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 1000,
      easing: "ease-in-out",
      fill: "forwards",
    });
  };

  return fadeAnim;
}
