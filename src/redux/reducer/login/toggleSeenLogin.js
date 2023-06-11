import { TOGGLE_SEEN_LOGIN } from "../../actions/action_types";

const initialState = {
    login_pasword: false,
    login_confirm_pasword: false
}

const reducer6 = (state=initialState, action)=>{
    switch(action.type){
        case TOGGLE_SEEN_LOGIN:
            const type = document.getElementById(action.id).type;
            document.getElementById(action.id).type = (type==='password')?'text':'password';
            state[action.id] = !state[action.id];
            return {...state};
        default:
            return state;
    }
}

export default reducer6;