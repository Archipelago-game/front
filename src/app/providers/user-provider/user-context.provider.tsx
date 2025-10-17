import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { BackendlessUser } from "../../../api/backendless-types.ts";
import {
  getUserId,
  hasUserToken,
  removeUserId,
  removeUserInfo,
  removeUserToken,
} from "../../../api/token-utils.ts";
import Backendless from "../../../api/backendless-config.ts";
import { UserContext } from "./use-user-context.hook.ts";

interface Props {
  children?: ReactNode;
}
export function UserContextProvider({ children }: Props) {
  const [state, setState] = useState<BackendlessUser | null>(null);

  useEffect(() => {
    if (hasUserToken()) {
      setUser();
    }
  }, []);

  const setUser = async () => {
    const userId = getUserId();
    if (!userId) {
      return;
    }

    const user = (await Backendless.Data.of("Users").findById(
      userId,
    )) as BackendlessUser;

    if (!user) {
      setState(user);
    }
  };

  const removeUser = useCallback(() => {
    setState(null);
    removeUserToken();
    removeUserInfo();
    removeUserId();
  }, []);

  const value = useMemo(
    () => ({
      user: state,
      setUser: setState,
      removeUser: removeUser,
    }),
    [state, setState, removeUser],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
