import { getToken } from "./user";
import { Api } from "./wrapper";
export * from "./wrapper";

const api = new Api();

api.instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
})

export { api };