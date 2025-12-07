import { Box } from "@mui/material";
import { useRef, useEffect } from "react";
import "./animation.css";
import { theme } from "../../common/styles/theme/custom-theme.ts";

import "./animation.css";
import { PATH_DATA } from "./path-data.const.ts";

interface Props {
  isStop: boolean;
  onFinish?: () => void;
}

export default function ScreenSaver({ isStop }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const primaryPath = useRef<SVGPathElement | null>(null);
  const secondaryPath = useRef<SVGPathElement | null>(null);

  const currentAnimationRef = useRef<{
    run: () => void;
    stop: () => void;
  } | null>(null);

  function setupInitialStyles(contourRef: SVGPathElement) {
    const pathLength = contourRef.getTotalLength();
    contourRef.style.strokeDasharray = String(pathLength);
    contourRef.style.strokeDashoffset = String(pathLength);
    contourRef.style.opacity = "1";
  }

  function startAnimation() {
    if (
      !primaryPath.current ||
      !secondaryPath.current ||
      !containerRef.current
    ) {
      return;
    }
    setupInitialStyles(primaryPath.current);
    setupInitialStyles(secondaryPath.current);

    drawPath(primaryPath.current, theme.palette.label.background.primary);
    drawPath(
      secondaryPath.current,
      theme.palette.label.background.secondary,
      500,
    );
    const animation = fadeFill(secondaryPath.current);

    const blink = blinkAnimation(secondaryPath.current);
    currentAnimationRef.current = blink;
    animation.onfinish = () => {
      blink.run();
    };
  }

  function drawPath(path: SVGPathElement, color: string, delay = 0) {
    const pathLength = path.getTotalLength();
    path.style.stroke = color;

    return path.animate(
      [{ strokeDashoffset: pathLength }, { strokeDashoffset: 0 }],
      {
        duration: 2000,
        easing: "ease-in-out",
        fill: "forwards",
        delay: delay,
      },
    );
  }

  function fadeFill(path: SVGPathElement, delay = 0) {
    path.style.opacity = "0";
    path.style.fill = "url(#gradient1)";
    return path.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 2000,
      easing: "ease-in-out",
      fill: "forwards",
      delay: delay,
    });
  }

  function blinkAnimation(path: SVGPathElement) {
    let animation: Animation | null = null;
    path.style.fill = "url(#gradient1)";

    return {
      run() {
        animation = path.animate(
          [{ opacity: 1 }, { opacity: 0.5 }, { opacity: 1 }],
          {
            duration: 4000,
            easing: "ease-in-out",
            fill: "forwards",
            iterations: Infinity,
          },
        );
      },
      stop() {
        animation?.cancel();
        animation = null;
        path.style.opacity = "0";
      },
    };
  }

  // function fadeInScreenSaver(element: HTMLDivElement) {
  //   element.style.opacity = "0";
  //   element.style.zIndex = "9999";
  //   return element.animate([{ opacity: 0 }, { opacity: 1 }], {
  //     duration: 1000,
  //     easing: "ease-in-out",
  //     fill: "forwards",
  //   });
  // }

  // function fadeOutScreenSaver(element: HTMLDivElement) {
  //   element.style.opacity = "1";
  //
  //   const animation = element.animate([{ opacity: 0 }, { opacity: 1 }], {
  //     duration: 1000,
  //     easing: "ease-in-out",
  //     fill: "forwards",
  //   });
  //
  //   animation.onfinish = () => {
  //     element.style.zIndex = "-9999";
  //   };
  // }

  useEffect(() => {
    if (primaryPath.current && secondaryPath.current && containerRef.current) {
      startAnimation();
    }
  }, [startAnimation]);

  useEffect(() => {
    if (isStop && currentAnimationRef.current) {
      currentAnimationRef.current.stop();
    }
  }, [isStop]);

  return (
    <Box
      className="screen-saver"
      ref={containerRef}
      sx={{
        position: "absolute",
        inset: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.background.paper,
        transition: "opacity 1s",
        zIndex: theme.zIndex.drawer + 1,
        pointerEvents: "none",
      }}
    >
      <Box>
        <svg
          className={"svg"}
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="512"
          height="512"
          viewBox="0 0 192 192"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="100%" stopColor="#707442" />
            </linearGradient>
          </defs>
          <g
            transform="translate(0,192) scale(0.1,-0.1)"
            fill="none"
            stroke="none"
          >
            <path ref={primaryPath} d={PATH_DATA} />
            <path ref={secondaryPath} d={PATH_DATA} />
          </g>
        </svg>
      </Box>
    </Box>
  );
}
