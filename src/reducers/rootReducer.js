import { combineReducers } from "redux";
import { clientReducer } from "./clientReducer";

export const rootReducer = combineReducers({
    client: clientReducer
});