import axios from "axios";

import { LoginForm, SignUpForm, ChangePasswordForm } from "../types";

const API = axios.create({ baseURL: "http://localhost:5001" });
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile") ?? "").token
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
