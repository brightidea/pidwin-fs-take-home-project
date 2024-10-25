import { jwtDecode } from "jwt-decode";
import { LOGIN, LOGOUT, UPDATE } from "../constants/actionTypes";
import { AuthAction, RootState, User } from "../types";

const initialState: RootState = {
    userData: null,
};

const loginReducer = (state: RootState = initialState, action: AuthAction) => {
    switch (action.type) {
        case LOGIN:
            const { token } = action.data || {};
            if (!token) return state;

            const userInfo = jwtDecode<User>(token);
            const userData = {
                email: userInfo?.email,
                exp: userInfo?.exp,
                name: userInfo?.name,
                picture: userInfo?.picture,
                tokens: userInfo?.tokens,
            };
            localStorage.setItem("profile", JSON.stringify({ ...action.data }));
            return {
                ...state,
                ...action.data,
                userData,
            };

        case LOGOUT:
            localStorage.removeItem("profile");
            return { ...state, token: null, userData: null };

        case UPDATE:
            return {
                ...state,
                ...action.data,
            };

        default:
            return state;
    }
};
export default loginReducer;
