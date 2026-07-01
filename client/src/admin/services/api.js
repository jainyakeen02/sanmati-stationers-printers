import axios from "axios";

/*
|--------------------------------------------------------------------------
| Base URL
|--------------------------------------------------------------------------
*/

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

/*
|--------------------------------------------------------------------------
| Request Interceptor
|--------------------------------------------------------------------------
*/

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/*
|--------------------------------------------------------------------------
| Response Interceptor
|--------------------------------------------------------------------------
*/

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");

      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  }
);

/*
|--------------------------------------------------------------------------
| Products API
|--------------------------------------------------------------------------
*/

export const productAPI = {
  getAll: () => API.get("/products"),

  getById: (id) => API.get(`/products/${id}`),

  create: (data) =>
    API.post("/products", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  update: (id, data) =>
    API.put(`/products/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  delete: (id) =>
    API.delete(`/products/${id}`),
};

/*
|--------------------------------------------------------------------------
| Services API
|--------------------------------------------------------------------------
*/

export const serviceAPI = {
  getAll: () => API.get("/services"),

  getById: (id) => API.get(`/services/${id}`),

  create: (data) =>
    API.post("/services", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  update: (id, data) =>
    API.put(`/services/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  delete: (id) =>
    API.delete(`/services/${id}`),
};

/*
|--------------------------------------------------------------------------
| Contact API
|--------------------------------------------------------------------------
*/

export const contactAPI = {
  getAll: () => API.get("/contacts"),

  delete: (id) =>
    API.delete(`/contacts/${id}`),
};

/*
|--------------------------------------------------------------------------
| Dashboard API
|--------------------------------------------------------------------------
*/

export const dashboardAPI = {
  getStats: () => API.get("/dashboard"),
};

export const galleryAPI = {
  getAll: () => API.get("/gallery"),
  create: (data) =>
    API.post("/gallery", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, data) =>
    API.put(`/gallery/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => API.delete(`/gallery/${id}`),
};

export const faqAPI = {
  getAll: () => API.get("/faqs"),
  create: (data) => API.post("/faqs", data),
  update: (id, data) => API.put(`/faqs/${id}`, data),
  delete: (id) => API.delete(`/faqs/${id}`),
};

export const testimonialAPI = {
  getAll: () => API.get("/testimonials"),
  create: (data) => API.post("/testimonials", data),
  update: (id, data) => API.put(`/testimonials/${id}`, data),
  delete: (id) => API.delete(`/testimonials/${id}`),
};

export const settingsAPI = {
  get: () => API.get("/settings"),
  update: (data) => API.put("/settings", data),
};

export default API;
