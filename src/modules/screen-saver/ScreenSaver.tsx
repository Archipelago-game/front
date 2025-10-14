import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import "./animation.css";

export default function AnimatedSvg() {
  const contourRef = useRef<SVGPathElement | null>(null);
  const fillRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    initializeStyles();
  }, []);

  const initializeStyles = () => {
    const contourPath = contourRef.current;
    const fillPath = fillRef.current;

    if (!contourPath || !fillPath) return;

    const pathLength = contourPath.getTotalLength();

    contourPath.style.strokeDasharray = `${pathLength}`;
    contourPath.style.strokeDashoffset = `${pathLength}`;
    contourPath.style.opacity = "1";

    fillPath.style.opacity = "0";
  };

  const startAnimation = () => {
    const contourPath = contourRef.current;
    const fillPath = fillRef.current;

    if (!contourPath || !fillPath) return;

    const pathLength = contourPath.getTotalLength();
    initializeStyles();

    // Анимация контура
    contourPath.animate(
      [{ strokeDashoffset: pathLength }, { strokeDashoffset: 0 }],
      {
        duration: 2000,
        easing: "ease-in-out",
        fill: "forwards",
      },
    );

    // Анимация заливки
    setTimeout(() => {
      fillPath.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1500,
        easing: "ease-out",
        fill: "forwards",
      });
    }, 2000);
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <div style={styles.container}>
      <svg
        width="0"
        height="0"
        viewBox="0 0 5120 5120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <clipPath
          id="svgClip"
          clipPathUnits="objectBoundingBox"
          transform="scale(0.0001953125)"
        >
          <path
            d="M2340 4164 c-227 -169 -563 -410 -667 -479 -40 -26 -73 -54 -73 -61
      0 -6 20 -24 44 -38 88 -52 81 40 84 -1011 2 -642 0 -941 -8 -967 -14 -49 -130
      -222 -224 -333 -41 -49 -76 -95 -76 -101 0 -6 64 -70 143 -142 78 -71 159
      -148 180 -171 24 -26 43 -39 51 -34 7 5 53 53 103 109 106 117 333 334 481
      459 56 47 102 92 102 99 0 7 -16 28 -36 47 -20 18 -49 52 -65 73 l-29 39 0
      342 c0 279 3 345 14 354 9 8 79 11 232 9 l219 -3 3 -383 c2 -367 1 -384 -18
      -422 -11 -22 -34 -55 -50 -74 l-31 -34 138 -139 c120 -120 254 -272 359 -405
      16 -21 37 -38 46 -38 21 0 408 407 408 430 0 9 -12 27 -26 41 -15 13 -75 82
      -135 153 -89 106 -109 136 -114 170 -3 23 -5 446 -3 941 3 750 5 905 17 927 8
      16 36 42 63 59 26 17 48 37 48 44 0 7 -84 69 -187 138 -104 68 -316 220 -473
      336 -157 116 -294 210 -305 210 -11 0 -108 -66 -215 -145z m289 -586 l190
      -143 1 -327 0 -328 -235 0 -235 0 0 451 c0 291 4 457 10 470 7 13 21 19 45 19
      28 0 66 -24 224 -142z"
          />
        </clipPath>
      </svg>

      <div style={styles.svgContainer}>
        <div className="shape"></div>
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="512"
          height="512"
          viewBox="0 0 512 512"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
            stroke="#000"
            fill="none"
            strokeWidth="8"
          >
            <path
              ref={contourRef}
              d="M2340 4164 c-227 -169 -563 -410 -667 -479 -40 -26 -73 -54 -73 -61
                  0 -6 20 -24 44 -38 88 -52 81 40 84 -1011 2 -642 0 -941 -8 -967 -14 -49 -130
                  -222 -224 -333 -41 -49 -76 -95 -76 -101 0 -6 64 -70 143 -142 78 -71 159
                  -148 180 -171 24 -26 43 -39 51 -34 7 5 53 53 103 109 106 117 333 334 481
                  459 56 47 102 92 102 99 0 7 -16 28 -36 47 -20 18 -49 52 -65 73 l-29 39 0
                  342 c0 279 3 345 14 354 9 8 79 11 232 9 l219 -3 3 -383 c2 -367 1 -384 -18
                  -422 -11 -22 -34 -55 -50 -74 l-31 -34 138 -139 c120 -120 254 -272 359 -405
                  16 -21 37 -38 46 -38 21 0 408 407 408 430 0 9 -12 27 -26 41 -15 13 -75 82
                  -135 153 -89 106 -109 136 -114 170 -3 23 -5 446 -3 941 3 750 5 905 17 927 8
                  16 36 42 63 59 26 17 48 37 48 44 0 7 -84 69 -187 138 -104 68 -316 220 -473
                  336 -157 116 -294 210 -305 210 -11 0 -108 -66 -215 -145z m289 -586 l190
                  -143 1 -327 0 -328 -235 0 -235 0 0 451 c0 291 4 457 10 470 7 13 21 19 45 19
                  28 0 66 -24 224 -142z"
            />
          </g>
          <g
            transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
            stroke="#000"
            fill="#000"
            opacity="0"
          >
            <path
              ref={fillRef}
              d="M2340 4164 c-227 -169 -563 -410 -667 -479 -40 -26 -73 -54 -73 -61
                  0 -6 20 -24 44 -38 88 -52 81 40 84 -1011 2 -642 0 -941 -8 -967 -14 -49 -130
                  -222 -224 -333 -41 -49 -76 -95 -76 -101 0 -6 64 -70 143 -142 78 -71 159
                  -148 180 -171 24 -26 43 -39 51 -34 7 5 53 53 103 109 106 117 333 334 481
                  459 56 47 102 92 102 99 0 7 -16 28 -36 47 -20 18 -49 52 -65 73 л-29 39 0
                  342 c0 279 3 345 14 354 9 8 79 11 232 9 l219 -3 3 -383 c2 -367 1 -384 -18
                  -422 -11 -22 -34 -55 -50 -74 л-31 -34 138 -139 c120 -120 254 -272 359 -405
                  16 -21 37 -38 46 -38 21 0 408 407 408 430 0 9 -12 27 -26 41 -15 13 -75 82
                  -135 153 -89 106 -109 136 -114 170 -3 23 -5 446 -3 941 3 750 5 905 17 927 8
                  16 36 42 63 59 26 17 48 37 48 44 0 7 -84 69 -187 138 -104 68 -316 220 -473
                  336 -157 116 -294 210 -305 210 -11 0 -108 -66 -215 -145z m289 -586 l190
                  -143 1 -327 0 -328 -235 0 -235 0 0 451 c0 291 4 457 10 470 7 13 21 19 45 19
                  28 0 66 -24 224 -142z"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    position: "absolute",
    inset: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  svgContainer: {
    position: "relative",
    width: "fit-content",
    outline: "1px solid #000000",
    margin: "0 auto",
  },
  controls: {
    textAlign: "center",
  },
};
