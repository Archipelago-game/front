import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import type { User as FirebaseUser } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, googleProvider } from "./firebase-config";
import { db } from "./firebase-config";
import type {
  FirebaseUserData,
  UserDocument,
  AuthError,
} from "./firebase-types";

export class FirebaseAuthService {
  /**
   * Sign in with Google
   */
  static async signInWithGoogle(): Promise<FirebaseUserData> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save user to Firestore
      await this.saveUserToFirestore(user);

      return this.mapFirebaseUserToUserData(user);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
    } catch (error: never) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Sign out current user
   */
  static async signOut(): Promise<void> {
    try {
      await signOut(auth);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
    } catch (error: never) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Get current user
   */
  static getCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
  }

  /**
   * Listen to auth state changes
   */
  static onAuthStateChanged(callback: (user: FirebaseUser | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  /**
   * Get user data from Firestore
   */
  static async getUserData(uid: string): Promise<UserDocument | null> {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        return userDoc.data() as UserDocument;
      }
      return null;
    } catch (error) {
      console.warn("Error getting user data from Firestore:", error);
      // Return null instead of throwing to prevent auth failures
      return null;
    }
  }

  /**
   * Save user to Firestore
   */
  private static async saveUserToFirestore(user: FirebaseUser): Promise<void> {
    try {
      const userRef = doc(db, "users", user.uid);
      const userData: Partial<UserDocument> = {
        uid: user.uid,
        email: user.email || undefined,
        displayName: user.displayName || undefined,
        photoURL: user.photoURL || undefined,
        emailVerified: user.emailVerified,
        lastLoginAt: serverTimestamp() as never,
      };

      // Check if user exists
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        // Create new user document
        await setDoc(userRef, {
          ...userData,
          createdAt: serverTimestamp(),
          characters: [],
        });
      } else {
        // Update existing user
        await setDoc(userRef, userData, { merge: true });
      }
    } catch (error) {
      console.warn("Error saving user to Firestore:", error);
      // Don't throw error to prevent auth failure
      // User can still be authenticated even if Firestore fails
    }
  }

  /**
   * Map Firebase User to our UserData interface
   */
  private static mapFirebaseUserToUserData(
    user: FirebaseUser,
  ): FirebaseUserData {
    return {
      uid: user.uid,
      email: user.email || undefined,
      displayName: user.displayName || undefined,
      photoURL: user.photoURL || undefined,
      emailVerified: user.emailVerified,
    };
  }

  /**
   * Handle authentication errors
   */
  private static handleAuthError(error: {
    code?: string;
    message?: string;
  }): AuthError {
    let message = "Произошла ошибка авторизации";

    switch (error.code) {
      case "auth/popup-closed-by-user":
        message = "Окно авторизации было закрыто";
        break;
      case "auth/cancelled-popup-request":
        message = "Запрос авторизации был отменен";
        break;
      case "auth/popup-blocked":
        message = "Всплывающее окно авторизации было заблокировано";
        break;
      case "auth/network-request-failed":
        message = "Ошибка сети";
        break;
      default:
        message = error.message || message;
    }

    return {
      code: error.code || "unknown",
      message,
    };
  }
}
