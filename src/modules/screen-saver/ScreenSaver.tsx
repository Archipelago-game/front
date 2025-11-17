import { Box } from "@mui/material";
import { useRef, useEffect } from "react";
import "./animation.css";
import { theme } from "../../common/styles/theme/custom-theme.ts";

import "./animation.css";
import { useScreenSaver } from "./screen-saver.hook.ts";

interface Props {
  onFinish?: () => void;
}

export default function AnimatedSvg(props: Props) {
  const { isShow, setIsShow } = useScreenSaver();

  const containerRef = useRef<HTMLDivElement>(null);
  const primaryPath = useRef<SVGPathElement | null>(null);
  const secondaryPath = useRef<SVGPathElement | null>(null);

  function initializeStyles(contourRef: SVGPathElement) {
    const pathLength = contourRef.getTotalLength();
    contourRef.style.strokeDasharray = String(pathLength);
    contourRef.style.strokeDashoffset = String(pathLength);
    contourRef.style.opacity = "1";
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
        props?.onFinish?.();
        setIsShow(false);
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

    return secondaryPath.animate(
      [{ strokeDashoffset: pathLength }, { strokeDashoffset: 0 }],
      {
        duration: 2000,
        easing: "ease-in-out",
        fill: "forwards",
        delay: 200,
      },
    );
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

  function moveAnimation(containerRef: HTMLDivElement) {}

  useEffect(() => {
    if (
      false &&
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
  }, [isShow]);

  // if (!isShow) return null;

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
        // zIndex: isShow ? 2000 : -2000,
        zIndex: 2000,
        opacity: 1,
      }}
    >
      <Box sx={{ border: "1px solid red" }}>
        <svg
          className={"svg"}
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="auto"
          height="100%"
          viewBox="0 0 451 697"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="100%" stopColor="#707442" />
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
