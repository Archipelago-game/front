// Types for working with Backendless API

export interface BackendlessUser {
  objectId?: string;
  email?: string;
  name?: string;
  "user-token"?: string;
  userToken?: string;
  oAuthIdentities?: OAuthIdentity[];
}

export interface AuthResponse {
  user: BackendlessUser;
  token?: string;
}

export interface OAuthUrlResponse {
  oauthUrl: string;
}

export interface OAuthIdentity {
  displayName: string;
  oAuthId: string;
  providerCode: string;
}
