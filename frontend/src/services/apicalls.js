import axios from "axios";

// Create a reusable axios instance
const api = axios.create({
  baseURL: "https://noteai-backend.onrender.com",
});

// Attach Access token automatically to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("Access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 Unauthorized by refreshing the token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const refresh = localStorage.getItem("Refresh");
      if (refresh) {
        try {
          // Get new Access token
          const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", { refresh });
          localStorage.setItem("Access", res.data.access);

          // Retry the original request with new token
          error.config.headers.Authorization = `Bearer ${res.data.access}`;
          return api(error.config);
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
          // optional: redirect to login page
        }
      }
    }
    return Promise.reject(error);
  }
);

// API functions
export async function Postnote(data) {
  return await api.post("/notes/", data);
}

export async function register(data) {
  return await api.post("/register", data);
}

export async function login(data) {
  return await api.post("/api/token/", data);
}

export async function getallnotes() {
  return await api.get("/notes/");
}

export async function noteDetail(id) {
    return await api.get(`/notes/${id}`)
    
}

export async function UpdateNote(id, data) {
  return await api.put(`/notes/${id}/`, data);
}


export async function deleteNote(id) {

  return await api.delete(`/notes/${id}/`)
  
}

