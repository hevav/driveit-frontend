import type { AxiosError, AxiosResponse } from 'axios';
import {api} from './';
import {Writable, writable} from "svelte/store";

const user: Writable<any> = writable(false);
const TOKEN_FIELD = "token";

const setToken = (token: string) => {
    localStorage.setItem(TOKEN_FIELD, token);
}

const getToken = () => {
    return localStorage.getItem(TOKEN_FIELD);
}

const removeToken = () => {
    localStorage.removeItem(TOKEN_FIELD);
}

const loadUser = () => new Promise((resolve, reject) => {
    api.user.info()
        .then((res) => {
            user.set(res.data);
            resolve(res.data);
        })
        .catch((err) => {
            if(err.response.status !== 401) {
                reject(err);
            }
            resolve(null);
        })
});

const unloadUser = () => user.set(false);

export {user, loadUser, unloadUser, setToken, getToken, removeToken};