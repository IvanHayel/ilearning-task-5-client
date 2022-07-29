import axios                                from "axios";
import {API_BASE_URL, HEADER_CONTENT_TYPE,} from "../Constants";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": HEADER_CONTENT_TYPE.JSON,
  },
});

api.interceptors.request.use(
    (config) => Promise.resolve(config),
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => Promise.resolve(response),
    (error) => Promise.reject(error)
);
