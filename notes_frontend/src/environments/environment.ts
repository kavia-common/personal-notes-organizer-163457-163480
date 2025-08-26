export const environment = {
  production: false,
  // PUBLIC_INTERFACE
  /** The base URL for the backend API (set via environment at build time if needed). */
  apiBaseUrl: (typeof process !== 'undefined' && (process as any)?.env?.NG_APP_API_BASE_URL) || 'http://localhost:8000/api',
  // PUBLIC_INTERFACE
  /** LocalStorage key for auth token */
  authTokenKey: 'notes_auth_token'
};
