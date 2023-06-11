import { MAKE_CHANGE_SIGNUP , CLEAR_DATA_SIGNUP} from "../../actions/action_types";

const initialState1 = {
    data: {
        fname: '',
        lname: '',
        username: '',
        email: '',
        pasword: '',
        confirm_pasword: '',
    },
    valid: false
}

const reducer2 = (state=initialState1, action)=> {
    switch(action.type){
        case MAKE_CHANGE_SIGNUP:
            const {fname, lname, username, email, pasword, confirm_pasword} = state.data;
            console.log("makeChangeSignup -> ",state.data);
            state.valid = (fname && lname && username && email && pasword && confirm_pasword)? true: false;
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.name]: action.value
                }
            }
        case CLEAR_DATA_SIGNUP:
            Object.keys(state.data).forEach(key=>state.data[key]="");
            return {
                ...state,
                data: {
                    ...state.data
                },
                valid: false
            }
        default:
            return state;
    }
}

export default reducer2;