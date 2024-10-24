import { LOGIN, LOGOUT } from "../constants/actionTypes";

export interface AppState {
    authData?: LoginForm | null;
    data?: any;
}

export type RootState = ReturnType<typeof store.getState>;

export type User = {
    id: string;
    name: string;
    picture: string;
    email: string;
    tokens: number;
    exp: number;
} | null;

export interface LoginForm {
    email: string;
    password: string;
}

export interface SignUpForm {
    username?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ChangePasswordForm {
    oldPassword: string;
    newPassword: string;
}

export interface InputPropsType {
    name: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    half?: boolean;
    value?: string;
    autoFocus?: boolean;
    type?: string;
    handleShowPassword?: (e) => void;
}

type ActionType = LOGIN | LOGOUT;

export interface Action {
    type: ActionType;
    payload?: any;
}

interface LoginAction {
    type: typeof LOGIN;
    data: LoginForm | null;
}

interface LogoutAction {
    type: typeof LOGOUT;
    data?: never;
}

export type AuthAction = LoginAction | LogoutAction;
