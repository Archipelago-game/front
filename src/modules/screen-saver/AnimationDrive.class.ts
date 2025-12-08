interface AnimationDriveConstructor {
  factory: () => Animation;
  onStop: (() => void) | null;
  onFinish: (() => void) | null;
}
export class AnimationDrive {
  private animation: Animation | null = null;
  private readonly factory: () => Animation;
  private readonly onStop: (() => void) | null = null;
  private readonly onFinish: (() => void) | null = null;

  constructor({ factory, onStop, onFinish }: AnimationDriveConstructor) {
    this.factory = factory;
    this.onStop = onStop;
    this.onFinish = onFinish;
  }

  run() {
    this.animation = this.factory();
    this.animation.onfinish = () => this.onFinish?.();
  }

  stop() {
    this.animation?.cancel();
    this.animation = null;
    this.onStop?.();
  }
}
