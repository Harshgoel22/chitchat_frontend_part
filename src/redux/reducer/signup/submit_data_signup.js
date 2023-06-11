import { SUBMIT_DATA_SIGNUP } from "../../actions/action_types";

const initialState = {
    loading: false,
    error: ''
}

const reducer4 = async (state=initialState, action)=>{
    switch(action.type){
        case SUBMIT_DATA_SIGNUP:
            action.event.preventDefault();
            return {...state};
        default:
            return state
    }
}

export default reducer4;
