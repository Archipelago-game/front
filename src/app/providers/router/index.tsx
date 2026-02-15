import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../../common/layouts/MainLayout.tsx";

const HomePage = lazy(() => import("../../../pages/home/HomePage.tsx"));

const AuthDonePage = lazy(
  () => import("../../../pages/AuthDonePage/AuthDonePage.tsx"),
);

import AuthProtectedRoute from "../../../modules/auth-protected-route/AuthProtectedRoute.tsx";

const CharacterPage = lazy(
  () => import("../../../pages/CharacterPage/CharacterPage.tsx"),
);

const CharactersPage = lazy(
  () => import("../../../pages/CharactersPage/CharactersPage.tsx"),
);

const CharacterGenerationPage = lazy(
  () =>
    import(
      "../../../pages/CharacterGenerationPage/CharacterGenerationPage.tsx"
    ),
);

const CharacterRulesPage = lazy(
  () => import("../../../pages/CharacterRulesPage/CharacterRulesPage.tsx"),
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "/",
        element: <AuthProtectedRoute />,
        children: [
          {
            path: "characters",
            element: <CharactersPage />,
          },
          {
            path: "game-form/:characterId",
            element: <CharacterPage />,
          },
          {
            path: "character-generation",
            element: <CharacterGenerationPage />,
          },
          {
            path: "character-generation/:characterId",
            element: <CharacterGenerationPage />,
          },
        ],
      },

      {
        path: "auth-done",
        element: <AuthDonePage />,
      },
      {
        path: "character-rules/:id?",
        element: <CharacterRulesPage />,
      },
    ],
  },
]);
