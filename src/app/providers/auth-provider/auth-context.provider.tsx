import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { BackendlessUser } from "../../../api/backendless-types.ts";
import { AuthUtils } from "../../../api/token-utils.ts";

import { AuthContext } from "./use-auth-context.hook.ts";
import { api } from "../../../api/api.ts";

interface Props {
  children?: ReactNode;
}
export function AuthContextProvider({ children }: Props) {
  const [state, setState] = useState<BackendlessUser | null>(null);

  useEffect(() => {
    const userId = AuthUtils.getUserId();
    if (userId) {
      setUser(userId);
    }
  }, []);

  const setUser = async (userId: string) => {
    const user = await api.getCurrentUser(userId);

    if (!user) {
      return;
    }
    setState(user);
  };

  const removeUser = useCallback(() => {
    setState(null);
    AuthUtils.removeUserId();
  }, []);

  const value = useMemo(
    () => ({
      isAuthorized: !!state,
      userInfo: state,
      setUserInfo: setState,
      removeUserInfo: removeUser,
    }),
    [state, setState, removeUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
