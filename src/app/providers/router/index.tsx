import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../../common/layouts/MainLayout.tsx";
import HomePage from "../../../pages/home/HomePage.tsx";
import CharacterPage from "../../../pages/CharacterPage/CharacterPage.tsx";
import AuthDonePage from "../../../pages/AuthDonePage/AuthDonePage.tsx";
import CharactersPage from "../../../pages/CharactersPage/CharactersPage.tsx";
import AuthProtectedRoute from "../../../modules/auth-protected-route/AuthProtectedRoute.tsx";

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
            path: "game-form",
            element: <CharacterPage />,
          },
        ],
      },

      {
        path: "auth-done",
        element: <AuthDonePage />,
      },
    ],
  },
]);
