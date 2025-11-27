type AnimationStep = () => Promise<Animation>;

// interface Props {
//   el: Element;
//   keyframes: Keyframe[];
//   options: KeyframeAnimationOptions;
// }

export class AnimationPipeline {
  private steps: AnimationStep[] = [];

  add(step: AnimationStep) {
    this.steps.push(step);
    return this;
  }

  async run() {
    for (const step of this.steps) {
      await step();
    }
  }
}

// const animateElement = async ({
//   el,
//   keyframes,
//   options,
// }: Props): Promise<Animation> => {
//   const animation = el.animate(keyframes, options);
//   return animation.finished;
// };
