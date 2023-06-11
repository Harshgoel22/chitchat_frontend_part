import { LOGIN_CHANGE_VALIDATE } from "../../actions/action_types";

const regExp = {
    login_username: /^[a-zA-Z.0-9_-]{6,16}/,
    login_pasword: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$&*%])[a-zA-Z_\d!@#$%&*]{8,}/
}

const initialState = {
    login_username: '',
    login_pasword: '',
    login_confirm_pasword: '',
    valid: false
}

const reducer7 = (state=initialState, action)=>{
    const msg = {
        login_username: "Invalid username! Atleast 6 characters",
        login_pasword: "Invalid password! Atleast 8 characters",
        login_confirm_pasword: "Different password and confirm password!"
    }

    switch(action.type){
        case LOGIN_CHANGE_VALIDATE:
            console.log(action.name+" -> "+action.value);
            if(action.value===''){
                state[action.name] = 'Required field...!';
            }
            else if(action.name==='login_username'){
                state.login_username = regExp.login_username.test(action.value)?'':msg['login_username'];
            }
            else if(action.name==='login_pasword'){
                state.login_username = (action.list.login_username==='')?'Not Defined!':state.login_username;
                state.login_pasword = regExp.login_pasword.test(action.value)?'':msg['login_pasword'];
                if(action.prev!==''){
                    state.login_confirm_pasword = (action.value===action.prev)?'':msg['login_confirm_pasword'];
                }
            }
            else if(action.name==='login_confirm_pasword'){
                state.login_confirm_pasword = (action.value===action.prev)?'':msg['login_confirm_pasword'];
            }
            // state[action.name] = regExp[action.name].test(action.value)?``:msg[action.name];
            state.valid = (state.login_username===''&& state.login_pasword==='' && state.login_confirm_pasword==='' && action.data.bool)?true:false;
            console.log("error_valid -> ", state.valid);
            return {...state};
        default:
            return state;
    }
}

export default reducer7;