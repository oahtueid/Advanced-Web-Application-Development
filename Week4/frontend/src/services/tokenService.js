const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const tokenService = {
  // Access token (in memory)
  accessToken: null,

  getAccessToken() {
    return this.accessToken;
  },

  setAccessToken(token) {
    this.accessToken = token;
  },

  clearAccessToken() {
    this.accessToken = null;
  },

  // Refresh token (localStorage)
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setRefreshToken(token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  clearRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  // Clear all tokens
  clearTokens() {
    this.clearAccessToken();
    this.clearRefreshToken();
  },
};
