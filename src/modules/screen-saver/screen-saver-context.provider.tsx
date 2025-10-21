import { type ReactNode, useMemo, useState } from "react";
import { ScreenSaverContext } from "./use-screen-saver-context.hook.ts";

interface Props {
  children: ReactNode;
}
export function ScreenSaverContextProvider({ children }: Props) {
  const [isShowFullAnimation, setIsShowFullAnimation] = useState(false);
  const [isShowSpinner, setIsShowSpinner] = useState(false);

  const value = useMemo(
    () => ({
      fullAnimation: {
        isShow: isShowFullAnimation,
        start: () => setIsShowFullAnimation(true),
        stop: () => setIsShowFullAnimation(false),
      },
      spinner: {
        isShow: isShowSpinner,
        start: () => setIsShowSpinner(true),
        stop: () => setIsShowSpinner(false),
      },
    }),
    [isShowFullAnimation, isShowSpinner],
  );

  return (
    <ScreenSaverContext.Provider value={value}>
      {children}
    </ScreenSaverContext.Provider>
  );
}
