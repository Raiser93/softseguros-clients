import {types} from '../types/types';

const initialState = {
    backDropOpen: false
};

export const uiReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.uiOpenBackDrop:
            return {
                ...state,
                backDropOpen: true
            }
        case types.uiCloseBackDrop:
            return {
                ...state,
                backDropOpen: false
            }
        default:
            return state;
    }
}