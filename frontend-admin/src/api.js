import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL, withCredentials: true });

// attach admin token to every request
// api.interceptors.request.use((cfg) => {
//   const token = localStorage.getItem("admin_token");
//   if (token) cfg.headers.Authorization = `Bearer ${token}`;
//   return cfg;
// });


export const errMsg = (e) => e.response?.data?.message || e.message || "Something went wrong";

// orders management apis
export const getOrders = () => api.get("/orders/get-all-orders", {withCredentials: true});
export const setOrderStatus = (id, status) => api.put(`orders/accept-order/${id}`, { status }, {withCredentials: true});

// products management apis
export const getProducts = () => api.get("/products/products-all", {withCredentials: true});
export const addProduct = (data) => api.post("/products/upload-product", data, {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
});
export const updateProduct = (id, data) => api.put(`/products/update-product/${id}`, data, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
// export const deleteProduct = (id) => api.delete(`/products/delete-product/${id}`);
