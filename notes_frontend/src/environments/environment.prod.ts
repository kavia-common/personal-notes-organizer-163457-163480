export const environment = {
  production: true,
  // PUBLIC_INTERFACE
  /** The base URL for the backend API (set via environment at build time if needed). */
  apiBaseUrl: (typeof process !== 'undefined' && (process as any)?.env?.NG_APP_API_BASE_URL) || 'https://api.example.com/api',
  // PUBLIC_INTERFACE
  /** LocalStorage key for auth token */
  authTokenKey: 'notes_auth_token'
};
