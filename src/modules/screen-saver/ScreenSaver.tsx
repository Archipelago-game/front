import { Box } from "@mui/material";
import { useRef, useEffect } from "react";
import "./animation.css";
import { theme } from "../../common/styles/theme/custom-theme.ts";

import "./animation.css";
import { useScreenSaverContext } from "./use-screen-saver-context.hook.ts";

export default function ScreenSaver() {
  const { fullAnimation, spinner } = useScreenSaverContext();

  const containerRef = useRef<HTMLDivElement>(null);
  const primaryPath = useRef<SVGPathElement | null>(null);
  const secondaryPath = useRef<SVGPathElement | null>(null);

  function initializeStyles(contourRef: SVGPathElement) {
    const pathLength = contourRef.getTotalLength();
    contourRef.style.strokeDasharray = String(pathLength);
    contourRef.style.strokeDashoffset = String(pathLength);
    contourRef.style.opacity = "1";
  }

  function containerOnStart(containerRef: HTMLDivElement) {
    containerRef.classList.remove("transparent");
    containerRef.style.zIndex = "10";
  }

  function containerOnEnd(containerRef: HTMLDivElement) {
    containerRef.classList.add("transparent");
    setTimeout(() => {
      containerRef.style.zIndex = "10";
    }, 100);
  }

  function startAnimation(
    primaryPath: SVGPathElement,
    secondaryPath: SVGPathElement,
    containerRef: HTMLDivElement,
  ) {
    drawAnimation(primaryPath, secondaryPath);
    const animation = backgroundAnimation(secondaryPath);
    animation.onfinish = () => {
      setTimeout(() => {
        containerRef.classList.add("transparent");
      }, 1000);
      setTimeout(() => {
        fullAnimation.stop();
      }, 2000);
    };
  }

  function drawAnimation(
    primaryPath: SVGPathElement,
    secondaryPath: SVGPathElement,
  ) {
    const pathLength = primaryPath.getTotalLength();

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

    const secondaryPathAnimation = secondaryPath.animate(
      [{ strokeDashoffset: pathLength }, { strokeDashoffset: 0 }],
      {
        duration: 2000,
        easing: "ease-in-out",
        fill: "forwards",
        delay: 200,
      },
    );
    return secondaryPathAnimation;
  }

  function backgroundAnimation(path: SVGPathElement) {
    path.style.opacity = "0";
    path.style.fill = "url(#gradient1)";
    return path.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 2000,
      easing: "ease-in-out",
      fill: "forwards",
      delay: 1000,
    });
  }

  useEffect(() => {
    if (primaryPath.current && secondaryPath.current && containerRef.current) {
      initializeStyles(primaryPath.current);
      initializeStyles(secondaryPath.current);
      startAnimation(
        primaryPath.current,
        secondaryPath.current,
        containerRef.current,
      );
    }
  }, []);

  useEffect(() => {
    if (fullAnimation.isShow) {
      if (
        primaryPath.current &&
        secondaryPath.current &&
        containerRef.current
      ) {
        initializeStyles(primaryPath.current);
        initializeStyles(secondaryPath.current);
        startAnimation(
          primaryPath.current,
          secondaryPath.current,
          containerRef.current,
        );
      }
    }
  }, [fullAnimation.isShow]);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "absolute",
        inset: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.background.paper,
        transition: "opacity 1s",
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
            <path
              ref={primaryPath}
              d="M915 1588 c-30 -22 -295 -212 -313 -224 -2 -1 8 -13 22 -27 l26 -26
            0 -351 c0 -391 4 -368 -74 -464 l-44 -53 68 -68 69 -68 73 75 c40 41 99 98
            132 126 l59 51 -27 31 c-25 31 -26 36 -26 161 l0 129 90 0 90 0 0 -144 c0
            -129 -2 -146 -20 -169 l-21 -26 43 -43 c24 -24 71 -74 104 -111 l60 -69 77 82
            78 81 -56 65 -55 65 0 350 0 350 27 25 c14 13 24 26 22 28 -2 1 -33 22 -69 46
            -36 24 -105 74 -155 110 -147 109 -133 104 -180 68z m78 -251 l67 -49 0 -124
            0 -124 -90 0 -90 0 0 174 c0 130 3 175 13 179 15 5 16 5 100 -56z"
            />
            <path
              ref={secondaryPath}
              d="M915 1588 c-30 -22 -295 -212 -313 -224 -2 -1 8 -13 22 -27 l26 -26
            0 -351 c0 -391 4 -368 -74 -464 l-44 -53 68 -68 69 -68 73 75 c40 41 99 98
            132 126 l59 51 -27 31 c-25 31 -26 36 -26 161 l0 129 90 0 90 0 0 -144 c0
            -129 -2 -146 -20 -169 l-21 -26 43 -43 c24 -24 71 -74 104 -111 l60 -69 77 82
            78 81 -56 65 -55 65 0 350 0 350 27 25 c14 13 24 26 22 28 -2 1 -33 22 -69 46
            -36 24 -105 74 -155 110 -147 109 -133 104 -180 68z m78 -251 l67 -49 0 -124
            0 -124 -90 0 -90 0 0 174 c0 130 3 175 13 179 15 5 16 5 100 -56z"
            />
          </g>
        </svg>
      </Box>
    </Box>
  );
}
