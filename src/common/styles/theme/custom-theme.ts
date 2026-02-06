import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,

      ...(mode === "light"
        ? {
            background: {
              default: "#ffffff",
              paper: "#ffffff",
            },
            text: {
              primary: "#1a1a1a",
              secondary: "#555555",
            },
            divider: "#e0e0e0",
          }
        : {
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
            text: {
              primary: "#ffffff",
              secondary: "#b0b0b0",
            },
            divider: "#2a2a2a",
          }),

      base:
        mode === "light"
          ? {
              background: "#786f61",
              surfaceBase: "#d8cfc5",
              surfaceAccent: "#d6cec3",
              surfaceLowered: "#342f2e",
              accent: "#707442",

              divider: "#6f6659", // базовый divider (≈ 12–16% темнее основного paper)

              // Более гранулярно (рекомендую добавить эти кастомные ключи)
              outline: "#80786f", // основной divider (между surfaceBase и другими элементами)
              outlineStrong: "#5c544a", // более заметный — между surfaceBase и surfaceLowered
              outlineSubtle: "#b8b0a5", // очень мягкий — между surfaceBase и surfaceAccent

              // Текст (контраст проверен примерно на WCAG AA)
              text: {
                primary: "#000000", // основной текст на surfaceBase / surfaceAccent
                secondary: "#707442", // акцентированный текст (класс, уровень, HP и т.д.)
                onDark: "#c0bbac", // обычный текст на surfaceLowered
                onDarkStrong: "#f3ece1", // выделенный / заголовки на тёмном
              },
            }
          : {
              background: "#786f61",
              surfaceBase: "#d8cfc5",
              surfaceAccent: "#d6cec3",
              surfaceLowered: "#342f2e",
              accent: "#707442",

              divider: "#6f6659", // базовый divider (≈ 12–16% темнее основного paper)

              // Более гранулярно (рекомендую добавить эти кастомные ключи)
              outline: "#80786f", // основной divider (между surfaceBase и другими элементами)
              outlineStrong: "#5c544a", // более заметный — между surfaceBase и surfaceLowered
              outlineSubtle: "#b8b0a5", // очень мягкий — между surfaceBase и surfaceAccent

              // Текст (контраст проверен примерно на WCAG AA)
              text: {
                primary: "#000000", // основной текст на surfaceBase / surfaceAccent
                secondary: "#707442", // акцентированный текст (класс, уровень, HP и т.д.)
                onDark: "#c0bbac", // обычный текст на surfaceLowered
                onDarkStrong: "#f3ece1", // выделенный / заголовки на тёмном
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
    },

    breakpoints: {
      values: {
        xs: 0,
        phablet: 560,
        sm: 600,
        tablet: 730,
        md: 960,
        lg: 1260,
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
