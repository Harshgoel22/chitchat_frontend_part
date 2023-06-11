import { TOGGLE_SEEN } from "../../actions/action_types";

const initialState = {
    pasword: false,
    confirm_pasword: false
}

const reducer3 = (state=initialState,action)=>{
    switch(action.type){
        case TOGGLE_SEEN:
            const type = document.getElementById(action.id).type;
            document.getElementById(action.id).type = (type==='password')?'text':'password';
            state[action.id] = !state[action.id];
            return {...state};
        default:
            return state;
    }
}

export default reducer3;