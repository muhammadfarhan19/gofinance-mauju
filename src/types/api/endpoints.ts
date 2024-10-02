const baseURL = "https://fakestoreapi.com";

export const AUTH_API = {
  POST_LOGIN: baseURL + "/auth/login",
  POST_REGISTER: baseURL + "/users/",
};

export const DATA_PRODUCTS = {
  GET_PRODUCT_LIST: baseURL + "/products/",
  GET_CATEGORY_LIST: baseURL + "/products/categories",
};

export const DATA_USER = {
  GET_USER_LIST: baseURL + "/users/",
};
