import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../../common/layouts/MainLayout.tsx";
import HomePage from "../../../pages/home/HomePage.tsx";
import GameFormPage from "../../../pages/GameFormPage/GameFormPage.tsx";
import AuthDonePage from "../../../pages/AuthDonePage/AuthDonePage.tsx";
import WorldDescriptionPage from "../../../pages/WorldDescriptionPage/WorldDescriptionPage.tsx";

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
        path: "game-form",
        element: <GameFormPage />,
      },
      {
        path: "auth-done",
        element: <AuthDonePage />,
      },
      {
        path: "world-description",
        element: <WorldDescriptionPage />,
      },
    ],
  },
]);
