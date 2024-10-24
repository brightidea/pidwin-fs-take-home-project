import { LOGIN, LOGOUT } from "../constants/actionTypes";
import { AppState, AuthAction } from "../types";

const initialState: AppState = {
    authData: null,
};

const loginReducer = (state: AppState = initialState, action: AuthAction) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem("profile", JSON.stringify({ ...action.data }));
            return { ...state, authData: action.data };

        case LOGOUT:
            localStorage.removeItem("profile");
            return { ...state, authData: null };

        default:
            return state;
    }
};
export default loginReducer;
