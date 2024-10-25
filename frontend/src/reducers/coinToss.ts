import { COIN_TOSS } from "../constants/actionTypes";
import { CoinTossResponseData, TossAction } from "../types";

const initialState: { currentToss: CoinTossResponseData | null } = {
    currentToss: null,
};

const coinTossReducer = (
    state = initialState,
    action: TossAction
): { currentToss: CoinTossResponseData | null } => {
    switch (action.type) {
        case COIN_TOSS:
            return { ...state, currentToss: action.data ?? null };
        default:
            return state;
    }
};
export default coinTossReducer;
