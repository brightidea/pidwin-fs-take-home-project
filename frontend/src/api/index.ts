import axios from "axios";

import {
    LoginForm,
    SignUpForm,
    ChangePasswordForm,
    CoinTossForm,
} from "../types";

const API = axios.create({ baseURL: "http://localhost:5001" });

API.interceptors.request.use((req) => {
    const localStorageProfile = localStorage.getItem("profile");
    const token = localStorageProfile && JSON.parse(localStorageProfile).token;

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const login = (formData: LoginForm) =>
    API.post("/api/user/login", formData);
export const signUp = (formData: SignUpForm) =>
    API.post("/api/user/signup", formData);
export const changePassword = (formData: ChangePasswordForm) =>
    API.post("/api/user/changePassword", formData);
export const getProfile = () => API.get("/api/user/getProfile");
export const coinToss = (coinTossForm: CoinTossForm) =>
    API.post("/api/coinToss/flip", coinTossForm);
export const getCoinTosses = () => API.get("/api/coinToss/history");
