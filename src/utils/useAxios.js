import axios from "axios";
import { useNavigate } from "react-router-dom";
const useAxios = () => {
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3002", // Default to local URL
    withCredentials: true,
    credentials: "include",
  });

  api.interceptors.request.use(
    config => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );

  api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const response = await api.post("/api/auth/refreshToken");
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
          return api(originalRequest);
        } catch (error) {
          if (error.response.status === 403) {
            
            originalRequest._retry = false;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            alert("session expired");
            navigate("/login", {
              replace: true,
            });
            window.location.reload();
            return Promise.reject(error);
          } else if (error.response.status === 500) {
            alert("une erreur s'est produite");
            originalRequest._retry = true;
          }
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );
  return api;
};

export default useAxios;
