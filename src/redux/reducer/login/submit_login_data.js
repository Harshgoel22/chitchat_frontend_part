import { SUBMIT_DATA_LOGIN } from "../../actions/action_types";

const initialState = {
    loading: true,
    error: ''
}

const reducer8 = (state=initialState, action)=>{
    switch(action.type){
        case SUBMIT_DATA_LOGIN:
            // action.e.preventDefault();
            return {...state};
        default:
            return state;
    }
}

export default reducer8;