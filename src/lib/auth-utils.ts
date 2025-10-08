/**
 * Utility functions for handling authentication tokens
 */

/**
 * Get the current authentication token from localStorage
 * This is the same logic used in the api.ts interceptor
 */
export function getAuthToken(): string | null {
  try {
    const storedAuth = localStorage.getItem('auth-store');
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      return authData.state?.access_token || null;
    }
  } catch (error) {
    console.error('Error getting token from storage:', error);
  }
  return null;
}

/**
 * Create headers with authentication token for API requests
 */
export function createAuthHeaders(): Record<string, string> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}
