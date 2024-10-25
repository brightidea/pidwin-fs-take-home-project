import { Dispatch } from "redux";

import { COIN_TOSS } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";
import { CoinTossForm } from "../types";

export const coinToss =
    (CoinTossForm: CoinTossForm) => async (dispatch: Dispatch) => {
        try {
            const { data } = await api.coinToss(CoinTossForm);
            dispatch({ type: COIN_TOSS, data });
            return data;
        } catch (error) {
            const axiosError = error as {
                response: { data: { message: string } };
            };
            messages.error(axiosError.response.data.message);
        }
    };
