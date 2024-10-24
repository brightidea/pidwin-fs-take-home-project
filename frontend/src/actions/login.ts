import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";

import { LOGIN, LOGOUT } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";
import { ChangePasswordForm, LoginForm, SignUpForm } from "../types";

export const signup =
    (formData: SignUpForm, history: NavigateFunction) =>
    async (dispatch: Dispatch) => {
        try {
            const { data } = await api.signUp(formData);
            dispatch({ type: LOGIN, data });
            history("/");
            messages.success("Login Successful");
        } catch (error) {
            const axiosError = error as {
                response: { data: { message: string } };
            };
            messages.error(axiosError.response.data.message);
        }
    };

export const login =
    (formData: LoginForm, history: NavigateFunction) =>
    async (dispatch: Dispatch) => {
        try {
            const { data } = await api.login(formData);
            console.log("login Data: ", data);
            dispatch({ type: LOGIN, data });
            history("/");
            messages.success("Login Successful");
        } catch (error) {
            const axiosError = error as {
                response: { data: { message: string } };
            };
            messages.error(axiosError.response.data.message);
        }
    };

export const changePassword =
    (formData: ChangePasswordForm, history: NavigateFunction) =>
    async (dispatch: Dispatch) => {
        try {
            const { data } = await api.changePassword(formData);
            console.log("Password Change Data: ", data);
            dispatch({ type: LOGOUT, data });
            messages.success("Password Change Was Successful");
            history("/");
        } catch (error) {
            const axiosError = error as {
                response: { data: { message: string } };
            };
            messages.error(axiosError.response.data.message);
        }
    };
