import { COIN_TOSS, COIN_TOSSES } from "../constants/actionTypes";
import { coinToss, CoinTossResponseData, TossAction } from "../types";

const initialState: {
    currentToss: CoinTossResponseData | null;
    tossHistory: coinToss[] | null;
} = {
    currentToss: null,
    tossHistory: null,
};

const coinTossReducer = (
    state = initialState,
    action: TossAction
): {
    currentToss: CoinTossResponseData | null;
    tossHistory: coinToss[] | null;
} => {
    switch (action.type) {
        case COIN_TOSS:
            return {
                ...state,
                currentToss: action?.data as CoinTossResponseData,
                tossHistory: action?.data?.tossHistory as coinToss[],
            };
        case COIN_TOSSES:
            return {
                ...state,
                tossHistory: action?.data?.tossHistory as coinToss[],
            };
        default:
            return state;
    }
};
export default coinTossReducer;
