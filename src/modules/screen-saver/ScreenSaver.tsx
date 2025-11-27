import { Box } from "@mui/material";
import { useRef, useEffect } from "react";
import "./animation.css";
import { theme } from "../../common/styles/theme/custom-theme.ts";

import "./animation.css";
import { useScreenSaver } from "./screen-saver.hook.ts";

import { drawAnimation } from "./animations/draw-logo.ts";
import { fillInAnimation } from "./animations/fill-logo.ts";
import { HighlightWave } from "./animations/highlight-wave.ts";

interface Props {
  onFinish?: () => void;
}

export default function AnimatedSvg() {
  const { isShow } = useScreenSaver();

  const backgroundRef = useRef<HTMLDivElement>(null);
  const innerContainerRef = useRef<HTMLDivElement>(null);

  const primaryPath = useRef<SVGPathElement | null>(null);
  const secondaryPath = useRef<SVGPathElement | null>(null);

  function initializeStyles(contourRef: SVGPathElement) {
    const pathLength = contourRef.getTotalLength();
    contourRef.style.strokeDasharray = String(pathLength);
    contourRef.style.strokeDashoffset = String(pathLength);
    contourRef.style.opacity = "1";
  }

  async function startAnimation(
    primaryPath: SVGPathElement,
    secondaryPath: SVGPathElement,
    backgroundRef: HTMLDivElement,
    innerContainerRef: HTMLDivElement,
  ) {
    drawAnimation(primaryPath, secondaryPath);
    await fillInAnimation(secondaryPath);
    const highlightAnimation = await HighlightWave(primaryPath);
    highlightAnimation.cancel();
    // backgroundRef.classList.add("transparent");
  }

  useEffect(() => {
    if (
      isShow &&
      primaryPath.current &&
      secondaryPath.current &&
      backgroundRef.current &&
      innerContainerRef.current
    ) {
      initializeStyles(primaryPath.current);
      initializeStyles(secondaryPath.current);
      startAnimation(
        primaryPath.current,
        secondaryPath.current,
        backgroundRef.current,
        innerContainerRef.current,
      );
    }
  }, [isShow]);

  if (!isShow) return null;

  return (
    <Box
      ref={backgroundRef}
      sx={{
        position: "absolute",
        inset: "0",
        zIndex: isShow ? 2000 : -2000,
        border: "1px solid green",
        transition: "opacity 1s",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: theme.palette.background.paper,
        }}
      />
      <Box
        ref={innerContainerRef}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          transformOrigin: "center center",
        }}
      >
        <svg
          className={"svg"}
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="auto"
          height="80vh"
          viewBox="0 0 451 697"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="fillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="100%" stopColor="#707442" />
            </linearGradient>

            <linearGradient
              id="highlightWave"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="40%" stopColor="white" stopOpacity="0" />
              <stop offset="50%" stopColor="white" stopOpacity="0.8" />
              <stop offset="60%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g
            transform="translate(0,697) scale(0.1,-0.1)"
            fill="none"
            stroke="none"
          >
            <path
              ref={primaryPath}
              opacity={1}
              d="M2043 6825 c-266 -195 -366 -269 -573 -422 -255 -188 -665 -479 -897
                -637 -111 -75 -204 -145 -208 -155 -9 -31 3 -45 68 -80 75 -41 122 -83 150
                -136 l22 -40 3 -1892 2 -1892 -25 -55 c-49 -107 -261 -410 -424 -604 -88 -106
                -161 -200 -161 -210 0 -10 37 -54 83 -98 87 -83 94 -90 360 -333 92 -84 167
                -156 167 -160 0 -3 23 -30 50 -59 32 -34 58 -52 73 -52 18 0 55 36 152 148
                203 234 698 712 991 957 197 166 234 203 234 240 0 27 -15 46 -98 128 -62 62
                -108 116 -125 150 l-27 54 0 670 c0 627 1 672 18 693 l17 22 445 -1 c408 -1
                446 -3 458 -19 10 -13 12 -169 10 -763 l-3 -746 -40 -77 c-22 -43 -68 -112
                -102 -153 -35 -43 -60 -80 -56 -88 3 -8 42 -46 86 -84 204 -173 495 -488 827
                -896 129 -159 144 -175 167 -175 11 0 128 114 288 281 445 464 535 564 535
                593 0 6 -41 54 -91 106 -50 52 -137 151 -193 220 -57 69 -133 161 -170 205
                -37 44 -75 94 -84 110 -16 28 -17 170 -20 1895 l-2 1866 26 52 c28 56 65 90
                161 146 64 38 85 68 62 92 -8 7 -99 68 -204 135 -314 201 -551 367 -1046 735
                -575 427 -642 474 -676 474 -25 0 -72 -30 -230 -145z m137 -1142 c169 -133
                371 -284 518 -387 l112 -79 0 -653 0 -654 -475 0 -475 0 0 895 c0 952 0 946
                47 974 10 6 45 11 78 11 l60 0 135 -107z"
            />
            <path
              ref={secondaryPath}
              d="M2043 6825 c-266 -195 -366 -269 -573 -422 -255 -188 -665 -479 -897
                -637 -111 -75 -204 -145 -208 -155 -9 -31 3 -45 68 -80 75 -41 122 -83 150
                -136 l22 -40 3 -1892 2 -1892 -25 -55 c-49 -107 -261 -410 -424 -604 -88 -106
                -161 -200 -161 -210 0 -10 37 -54 83 -98 87 -83 94 -90 360 -333 92 -84 167
                -156 167 -160 0 -3 23 -30 50 -59 32 -34 58 -52 73 -52 18 0 55 36 152 148
                203 234 698 712 991 957 197 166 234 203 234 240 0 27 -15 46 -98 128 -62 62
                -108 116 -125 150 l-27 54 0 670 c0 627 1 672 18 693 l17 22 445 -1 c408 -1
                446 -3 458 -19 10 -13 12 -169 10 -763 l-3 -746 -40 -77 c-22 -43 -68 -112
                -102 -153 -35 -43 -60 -80 -56 -88 3 -8 42 -46 86 -84 204 -173 495 -488 827
                -896 129 -159 144 -175 167 -175 11 0 128 114 288 281 445 464 535 564 535
                593 0 6 -41 54 -91 106 -50 52 -137 151 -193 220 -57 69 -133 161 -170 205
                -37 44 -75 94 -84 110 -16 28 -17 170 -20 1895 l-2 1866 26 52 c28 56 65 90
                161 146 64 38 85 68 62 92 -8 7 -99 68 -204 135 -314 201 -551 367 -1046 735
                -575 427 -642 474 -676 474 -25 0 -72 -30 -230 -145z m137 -1142 c169 -133
                371 -284 518 -387 l112 -79 0 -653 0 -654 -475 0 -475 0 0 895 c0 952 0 946
                47 974 10 6 45 11 78 11 l60 0 135 -107z"
            />
          </g>
        </svg>
      </Box>
    </Box>
  );
}
