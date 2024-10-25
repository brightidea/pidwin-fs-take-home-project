import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { LOGIN, LOGOUT, UPDATE } from "../constants/actionTypes";
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

export const getProfile = createAsyncThunk(
    "user/getProfile",
    async (_, { dispatch }) => {
        try {
            const { data } = await api.getProfile();
            dispatch({ type: UPDATE, data });
        } catch (error) {
            const axiosError = error as {
                response: { data: { message: string } };
            };
            messages.error(axiosError.response.data.message);
        }
    }
);
