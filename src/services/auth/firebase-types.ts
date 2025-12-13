// import type { User as FirebaseUser } from "firebase/auth";

// Firebase User interface extending Firebase's User
export interface FirebaseUserData {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
  createdAt?: Date;
  lastLoginAt?: Date;
}

// Auth response interface
// export interface AuthResponse {
//   user: FirebaseUserData;
//   token?: string;
// }

// User document in Firestore
export interface UserDocument {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
  createdAt: Date;
  lastLoginAt: Date;
  characters?: string[]; // Array of character IDs
}

// Error interface for auth operations
export interface AuthError {
  code: string;
  message: string;
}
