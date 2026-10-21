// Why do we need a TOKEN_KEY?
const TOKEN_KEY = "kanban_token";

// The token needs to survive a page refresh, so it can’t live in React state, which resets on reload.
// So we have these functions to send and manipulate data in localstorage
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token:string) => localStorage.setItem(TOKEN_KEY, token);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

// using localStorage can be unsafe since other services can access it, but changing from it is
// outside of the scope.