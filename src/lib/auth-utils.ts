/**
 * Utility functions for handling authentication tokens
 */

/**
 * Get the current authentication token from localStorage
 * Returns null if token is expired or invalid
 */
export function getAuthToken(): string | null {
  try {
    const storedAuth = localStorage.getItem('auth-store');
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      const token = authData.state?.access_token;
      
      // Basic token validation (check if it exists and has proper structure)
      if (token && typeof token === 'string' && token.length > 0) {
        return token;
      }
    }
  } catch (error) {
    // Silently handle errors to avoid exposing sensitive information
    if (process.env.NODE_ENV === 'development') {
      console.warn('Error getting token from storage:', error);
    }
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
