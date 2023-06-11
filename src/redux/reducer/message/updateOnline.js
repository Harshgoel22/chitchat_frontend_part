import { UPDATE_ONLINE,LOGOUT } from "../../actions/action_types";

const initialState = {
    payload: {}
}

export const reducer10 = (state=initialState, action)=>{
    switch(action.type){
        case UPDATE_ONLINE:
            return {
                ...state,
                payload: {...action.data}
            }
        case LOGOUT:
            return {...state};
        default:
            return state;
    }
}