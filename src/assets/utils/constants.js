// const API_URL = "http://localhost:4000";
const API_URL = import.meta.env.VITE_DB_URL;

export const API_ROUTES = {
  SIGN_UP: `${API_URL}/api/admin/auth/signup`,
  LOG_IN: `${API_URL}/api/admin/auth/login`,
  FOODS: `${API_URL}/api/foods`,
};

export const APP_ROUTES = {
  ADD_FOOD: "/add",
  DELETE_FOOD: "/delete",
};
