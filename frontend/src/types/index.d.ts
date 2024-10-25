import { LOGIN, LOGOUT, COIN_TOSS } from "../constants/actionTypes";

export interface AppState {
    user?: AuthData | null;
    coinToss?: CoinTossResponseData | null;
    data?: any;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type User = {
    id: string;
    name: string;
    picture: string;
    email: string;
    tokens: number;
    exp: number;
} | null;

export type AuthData = {
    token: string | null;
    userData: User | null;
};
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

export type CoinTossForm = {
    wager: number;
    coinSide: string;
};

export type CoinTossResponseData = {
    currentToss: currentTossData | null;
};

export type currentTossData = {
    result: string;
    resultSide: string;
    winnings: number;
    tokens: number;
};

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

type ActionType = typeof LOGIN | typeof LOGOUT | typeof COIN_TOSS;

export interface Action {
    type: ActionType;
    payload?: unknown;
}

interface LoginAction {
    type: typeof LOGIN;
    data: AuthData | null;
}

interface LogoutAction {
    type: typeof LOGOUT;
    data?: never;
}

interface CoinTossAction {
    type: typeof COIN_TOSS;
    data?: CoinTossResponseData | null;
}

export type AuthAction = LoginAction | LogoutAction;
export type TossAction = CoinTossAction;
