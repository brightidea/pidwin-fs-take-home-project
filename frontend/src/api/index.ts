import axios from "axios";

import {
    LoginForm,
    SignUpForm,
    ChangePasswordForm,
    CoinTossForm,
} from "../types";

const API = axios.create({ baseURL: "http://localhost:5001" });
const localStorageProfile = localStorage.getItem("profile");
API.interceptors.request.use((req) => {
    if (localStorageProfile) {
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorageProfile).token
        }`;
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
