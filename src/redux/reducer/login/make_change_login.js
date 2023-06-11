import { MAKE_CHANGE_LOGIN, CLEAR_DATA_LOGIN} from "../../actions/action_types";

const initialState = {
    login_username: '',
    login_pasword: '',
    login_confirm_pasword: '',
    valid: false
}

export const reducer5 = (state=initialState, action)=>{
    switch(action.type){
        case MAKE_CHANGE_LOGIN:
            state[action.name] = action.value;
            console.log("loginState -> ",state);
            state.valid = (state.login_username&&state.login_pasword&&state.login_confirm_pasword)?true:false;
            console.log(`list valid -> ${state.valid}`);
            return {...state};

        case CLEAR_DATA_LOGIN:
            Object.keys(state).forEach(key=>{if(key!=='valid') state[key]=''});
            return {
                ...state,
                valid: false
            };

        default:
            return state;
    }
}
