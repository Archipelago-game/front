import Backendless from "backendless";

// Backendless configuration
const APP_ID = "921EA541-5840-4551-9113-0FD60D6B3802";
const API_KEY = "E21FF1D5-DAE8-4ACE-B1DB-E86A67A23FDC";
const BASE_URL = `https://api.backendless.com/${APP_ID}/${API_KEY}`;

// Initialize Backendless
Backendless.initApp(APP_ID, API_KEY);

// OAuth API functions
export const oauthApi = {
  /**
   * Get OAuth URL for Google authentication
   */
  async getGoogleOAuthUrl(redirectAfterLoginUrl: string): Promise<string> {
    const response = await fetch(
      `${BASE_URL}/users/oauth/googleplus/request_url`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          redirectAfterLoginUrl,
          scopes: ["email", "https://www.googleapis.com/auth/userinfo.profile"],
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Backendless returns the URL as plain text, not JSON
    const oauthUrl = await response.text();

    if (!oauthUrl || !oauthUrl.startsWith("http")) {
      throw new Error("Invalid OAuth URL received");
    }

    return oauthUrl;
  },
};

export default Backendless;
