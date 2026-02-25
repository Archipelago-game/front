import { alpha, createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,

      ...(mode === "light"
        ? {
            error: {
              main: "#A3473A", // тёплый кирпичный
            },
            warning: {
              main: "#C59B3A", // латунь / золото
            },
            success: {
              main: "#587A4A", // травяной
            },
            info: {
              main: "#5C7A8C", // пыльно-синий металл
            },

            primary: {
              main: "#C9B79C", // тёплый бежево-кожаный
              light: "#D8C9B3",
              dark: "#A89578",
              contrastText: "#2B2621",
            },
            secondary: {
              main: "#4E5B3C", // тёмный оливково-лесной
              light: "#66764F",
              dark: "#39422B",
              contrastText: "#F4F1EA",
            },
            background: {
              default: "#786f61",
              paper: "#E3D8C8",
            },
            text: {
              primary: "#1F1B17",
              secondary: "#3A342E",
              disabled: "rgba(31, 27, 23, 0.4)",
            },
            divider: "rgba(0, 0, 0, 0.08)",
          }
        : {
            error: {
              main: "#A3473A", // тёплый кирпичный
            },
            warning: {
              main: "#C59B3A", // латунь / золото
            },
            success: {
              main: "#587A4A", // травяной
            },
            info: {
              main: "#5C7A8C", // пыльно-синий металл
            },

            primary: {
              main: "#C9B79C", // тёплый бежево-кожаный
              light: "#D8C9B3",
              dark: "#A89578",
              contrastText: "#2B2621",
            },
            secondary: {
              main: "#4E5B3C", // тёмный оливково-лесной
              light: "#66764F",
              dark: "#39422B",
              contrastText: "#F4F1EA",
            },
            background: {
              default: "#786f61",
              paper: "#E3D8C8",
            },
            text: {
              primary: "#1F1B17",
              secondary: "#3A342E",
              disabled: "rgba(31, 27, 23, 0.4)",
            },
            divider: "rgba(0, 0, 0, 0.08)",
          }),

      base:
        mode === "light"
          ? {
              background: "#786f61",
              surfaceBase: "#d8cfc5",
              surfaceAccent: "#e0d9cf",
              surfaceLowered: "#342f2e",
              accent: "#707442",

              divider: "#6f6659", // базовый divider (≈ 12–16% темнее основного paper)

              // Более гранулярно (рекомендую добавить эти кастомные ключи)
              outline: "#b8b0a5", // основной divider (между surfaceBase и другими элементами)
              outlineSoft: alpha("#b8b0a5", 0.3),
              outlineStrong: "#5c544a", // более заметный — между surfaceBase и surfaceLowered
              outlineSubtitle: "#80786f", // очень мягкий — между surfaceBase и surfaceAccent

              // Текст (контраст проверен примерно на WCAG AA)
              text: {
                title: "#000000",
                primary: "#000000", // основной текст на surfaceBase / surfaceAccent
                primaryLight: "#333",
                secondary: "#707442", // акцентированный текст (класс, уровень, HP и т.д.)
                onLowered: "#c0bbac", // обычный текст на surfaceLowered
                onLoweredStrong: "#f3ece1", // выделенный / заголовки на тёмном
              },
              // Цветовой маркер атрибутов
              conditions: {
                physical: {
                  primary: "#c62828", //"#8B2E2E",
                  background: alpha("#c62828", 0.1),
                  border: alpha("#c62828", 0.3),
                  hover: alpha("#c62828", 0.4),
                  primaryHalf: "#8B5A2E",
                },
                mental: {
                  primary: "#7b1fa2",
                  background: alpha("#7b1fa2", 0.1),
                  border: alpha("#7b1fa2", 0.4),
                  hover: alpha("#7b1fa2", 0.3),
                  primaryHalf: "#3B2AD9",
                },
              },
            }
          : {
              background: "#786f61",
              surfaceBase: "#d8cfc5",
              surfaceAccent: "#e0d9cf",
              surfaceLowered: "#342f2e",
              accent: "#707442",

              divider: "#6f6659", // базовый divider (≈ 12–16% темнее основного paper)

              // Более гранулярно (рекомендую добавить эти кастомные ключи)
              outline: "#80786f", // основной divider (между surfaceBase и другими элементами)
              outlineSoft: alpha("#b8b0a5", 0.3),
              outlineStrong: "#5c544a", // более заметный — между surfaceBase и surfaceLowered
              outlineSubtitle: "#b8b0a5", // очень мягкий — между surfaceBase и surfaceAccent

              // Текст (контраст проверен примерно на WCAG AA)
              text: {
                title: "#000000",
                primary: "#000000", // основной текст на surfaceBase / surfaceAccent
                primaryLight: "#333",
                secondary: "#707442", // акцентированный текст (класс, уровень, HP и т.д.)
                onLowered: "#c0bbac", // обычный текст на surfaceLowered
                onLoweredStrong: "#f3ece1", // выделенный / заголовки на тёмном
              },

              // Цветовой маркер атрибутов
              conditions: {
                physical: {
                  primary: "#c62828", //"#8B2E2E",
                  background: alpha("#c62828", 0.1),
                  border: alpha("#c62828", 0.3),
                  hover: alpha("#c62828", 0.4),
                  primaryHalf: "#8B5A2E",
                },
                mental: {
                  primary: "#7b1fa2",
                  background: alpha("#7b1fa2", 0.1),
                  border: alpha("#7b1fa2", 0.4),
                  hover: alpha("#7b1fa2", 0.3),
                  primaryHalf: "#3B2AD9",
                },
              },
            },

      // твоя кастомная палитра label
      label: {
        text: {
          primary: "#ffffff",
          secondary: mode === "light" ? "#ffffff" : "#e0e0e0",
        },
        background: {
          primary: mode === "light" ? "#000000" : "#2b2b2b",
          secondary: mode === "light" ? "#707442" : "#8a8f4f",
        },
      },
    },

    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: "4px 8px",
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 8,
          },
        },
        variants: [
          {
            props: { variant: "contained", color: "primary" },
            style: {
              backgroundColor: "#C9B79C",
              color: "#2B2621",

              "&:hover": {
                backgroundColor: "#BDAA8C",
                color: "#F4F1EA",
              },
              "&:active": {
                backgroundColor: "#A89578",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.25)",
              },
              "&.Mui-disabled": {
                backgroundColor: "#D9D0C4",
                color: "rgba(43,38,33,0.4)",
              },
            },
          },
          {
            props: { variant: "contained", color: "secondary" },
            style: {
              backgroundColor: "#4E5B3C",
              color: "#F4F1EA",

              "&:hover": {
                backgroundColor: "#445033",
                color: "#2B2621", // ← добавить
              },
              "&:active": {
                backgroundColor: "#39422B",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)",
              },
              "&.Mui-disabled": {
                backgroundColor: "#7A836B",
                color: "rgba(244,241,234,0.5)",
              },
            },
          },
          {
            props: { variant: "outlined", color: "primary" },
            style: {
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#C9B79C",
              backgroundColor: "transparent",
              color: "#2B2621",

              "&:hover": {
                borderColor: "#BDAA8C",
                backgroundColor: "rgba(201,183,156,0.12)",
                color: "#2B2621",
              },

              "&:active": {
                borderColor: "#A89578",
                backgroundColor: "rgba(201,183,156,0.2)",
                color: "#1F1B16",
              },

              "&.Mui-focusVisible": {
                borderColor: "#BDAA8C",
                backgroundColor: "rgba(201,183,156,0.16)",
                color: "#2B2621",
                boxShadow: "0 0 0 3px rgba(201,183,156,0.35)",
              },

              "&.Mui-disabled": {
                borderColor: "#D9D0C4",
                backgroundColor: "transparent",
                color: "rgba(43,38,33,0.4)",
              },
            },
          },
          {
            props: { variant: "outlined", color: "secondary" },
            style: {
              borderWidth: "1px",
              borderColor: "#4E5B3C",
              color: "#4E5B3C",
              backgroundColor: "transparent",

              "&:hover": {
                backgroundColor: "rgba(78,91,60,0.12)",
                borderColor: "#445033",
                color: "#445033",
              },

              "&:active": {
                backgroundColor: "rgba(78,91,60,0.2)",
                borderColor: "#39422B",
                color: "#39422B",
              },

              "&.Mui-disabled": {
                borderColor: "#7A836B",
                color: "rgba(78,91,60,0.4)",
              },
            },
          },
        ],
      },
    },

    breakpoints: {
      values: {
        xs: 0,
        phablet: 560,
        sm: 675,
        tablet: 730,
        md: 960,
        lgmd: 1045,
        lg: 1320,
        xl: 1536,
      },
    },
  });

/**
 * background страницы: #786f61
 * основной background карточки: #d8cfc5
 * background карточки для акцента: #d6cec3
 * divider внутри карточки с основным background: ?
 * divider внутри карточки с акцентным background: ?
 * цвет текста в карточке: #000
 * цвет текста в карточке для акцента: #707442
 *
 * темный background: #342f2e
 * нормальный цвет текста на темный background: #c0bbac
 * акцентированный цвет текста на темный background: #f3ece1
 * divider внутри компонента с темный background: ?
 * divider внутри компонента с темный background: ?
 *
 *
 *
 */
