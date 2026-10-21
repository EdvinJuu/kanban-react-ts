import axios from "axios";
import { getToken, removeToken } from "../utils/tokenUtils";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});


// Before every request leaves, attach the token if it exists
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// AFTER every response, if the server gives 401 AND there is a token,
// Session = dead = log out
api.interceptors.response.use((response) => response, (error) => {
  if (error.response?.status === 401 && getToken()) { // Why specificly 401?
    removeToken();
    window.location.href = "/login"; // does this relocate the user to /login?
  }
  return Promise.reject(error); // What does this do?
})

export default api