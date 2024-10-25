import { combineReducers } from "redux";
import login from "./login";
import coinToss from "./coinToss";

export default combineReducers({
    login,
    coinToss,
});
