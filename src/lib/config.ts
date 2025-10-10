import { WebStorageStateStore } from 'oidc-client-ts';

// Validate required environment variables
const requiredEnvVars = {
  NEXT_PUBLIC_COGNITO_AUTHORITY: process.env.NEXT_PUBLIC_COGNITO_AUTHORITY,
  NEXT_PUBLIC_COGNITO_CLIENT_ID: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
  NEXT_PUBLIC_COGNITO_DOMAIN: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
};

const missingVars = Object.entries(requiredEnvVars)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingVars.join(', ')}. Please check your .env.local file.`);
}

export const cognitoAuthConfig = {
  authority: process.env.NEXT_PUBLIC_COGNITO_AUTHORITY,
  client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
  redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI || "http://localhost:3000/auth/callback",
  post_logout_redirect_uri: process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI || "http://localhost:3000",
  response_type: "code",
  scope: "email openid profile",
  loadUserInfo: true,
  cognitoDomain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
  
  // Session management settings for cross-tab authentication
  automaticSilentRenew: true,
  includeIdTokenInSilentRenew: true,
  silent_redirect_uri: process.env.NEXT_PUBLIC_SILENT_REDIRECT_URI || "http://localhost:3000/auth/silent-callback",
  
  // User store settings to persist authentication across tabs
  userStore: typeof window !== 'undefined' ? new WebStorageStateStore({
    store: window.localStorage
  }) : undefined,
  
  // Timing settings
  silentRequestTimeout: 10000,
  accessTokenExpiringNotificationTime: 60,
  checkSessionInterval: 2000,
  
  // Enable session monitoring
  monitorSession: true,
  
  // Stale state cleanup
  staleStateAge: 900, // 15 minutes
};

export const appConfig = {
  name: "Resume Manager",
  description: "Resume Manager",
  version: "1.0.0",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
};

export const routes = {
  home: "/",
  login: "/auth/login",
  callback: "/auth/callback",
  resumes: "/resumes",
} as const;
