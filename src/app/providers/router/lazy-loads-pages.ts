import { lazy } from "react";

export const HomePage = lazy(() => import("../../../pages/home/HomePage.tsx"));
export const AuthDonePage = lazy(
  () => import("../../../pages/AuthDonePage/AuthDonePage.tsx"),
);
export const CharacterPage = lazy(
  () => import("../../../pages/CharacterPage/CharacterPage.tsx"),
);
export const CharactersPage = lazy(
  () => import("../../../pages/CharactersPage/CharactersPage.tsx"),
);
export const CharacterGenerationPage = lazy(
  () =>
    import(
      "../../../pages/CharacterGenerationPage/CharacterGenerationPage.tsx"
    ),
);

export const CharacterRulesPage = lazy(
  () => import("../../../pages/CharacterRulesPage/CharacterRulesPage.tsx"),
);
