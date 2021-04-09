import { combineReducers } from 'redux';
import { clientReducer } from './clientReducer';
import { uiReducer } from './uiReducer';

export const rootReducer = combineReducers({
    client: clientReducer,
    ui: uiReducer
});