const TOKEN_KEY = 'auth-token-infotecs' as const;

export const setToken = (token: string) => {
  if (!(typeof token === 'string')) return;

  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (key = TOKEN_KEY) => {
  return localStorage.getItem(key);
};

export const removeToken = (key = TOKEN_KEY) => {
  localStorage.removeItem(key);
};

export const isLoggedIn = () => {
  return !!getToken();
};
