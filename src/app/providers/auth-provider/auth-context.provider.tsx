import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { FirebaseUserData } from "../../../api/firebase-types.ts";
import { FirebaseAuthService } from "../../../api/firebase-auth-service.ts";

import { AuthContext } from "./use-auth-context.hook.ts";

interface Props {
  children?: ReactNode;
}
export function AuthContextProvider({ children }: Props) {
  const [state, setState] = useState<FirebaseUserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = FirebaseAuthService.onAuthStateChanged(async (user) => {
      console.log("user", user);
      if (user) {
        try {
          const userData = await FirebaseAuthService.getUserData(user.uid);
          if (userData) {
            setState({
              uid: userData.uid,
              email: userData.email,
              displayName: userData.displayName,
              photoURL: userData.photoURL,
              emailVerified: userData.emailVerified,
            });
          } else {
            // Fallback to Firebase Auth user data if Firestore fails
            setState({
              uid: user.uid,
              email: user.email || undefined,
              displayName: user.displayName || undefined,
              photoURL: user.photoURL || undefined,
              emailVerified: user.emailVerified,
            });
          }
        } catch (error) {
          console.warn("Error getting user data:", error);
          // Fallback to Firebase Auth user data
          setState({
            uid: user.uid,
            email: user.email || undefined,
            displayName: user.displayName || undefined,
            photoURL: user.photoURL || undefined,
            emailVerified: user.emailVerified,
          });
        }
      } else {
        setState(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const removeUser = useCallback(async () => {
    try {
      await FirebaseAuthService.signOut();
      setState(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }, []);

  const value = useMemo(
    () => ({
      isAuthorized: !!state,
      userInfo: state,
      setUserInfo: setState,
      removeUserInfo: removeUser,
      isLoading,
    }),
    [state, removeUser, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
