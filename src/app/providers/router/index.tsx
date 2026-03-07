import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../../common/layouts/MainLayout.tsx";

import AuthProtectedRoute from "../../../modules/auth-protected-route/AuthProtectedRoute.tsx";
import NotFoundPage from "../../../pages/NotFoundPage/NotFoundPage.tsx";
import {
  AuthDonePage,
  CharacterGenerationPage,
  CharacterPage,
  CharacterRulesPage,
  CharactersPage,
  HomePage,
} from "./lazy-loads-pages.ts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "auth-done",
        element: <AuthDonePage />,
      },

      {
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
          {
            path: "character-rules/:id?",
            element: <CharacterRulesPage />,
          },
        ],
      },

      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
