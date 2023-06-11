import { SIGNUP_CHANGE_VALIDATE } from "../../actions/action_types"

const regExp = {
    username: /^[a-zA-Z.0-9_-]{6,16}/,
    email: /^[a-zA-Z0-9._-]{5,}@[a-zA-Z]{5,}[.][a-zA-Z]{2,}[a-zA-Z.]*/,
    pasword: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$&*%])[a-zA-Z_\d!@#$%&*]{8,}/
}

const initialState = {
    data: {
        fname: '',
        lname: '',
        username: '',
        email: '',
        pasword: '',
        confirm_pasword: '',
        valid: false
    }
}

const reducer1 = (state=initialState, action)=> {
    // console.log("signup_reducer -> ",state.data);
    switch(action.type){
        case SIGNUP_CHANGE_VALIDATE: 
            if(action.value===''){
                state.data[action.name] = 'Required field...!';
            }else if(action.name==='fname'){
                state.data.fname = '';
            }else if(action.name==='lname'){
                state.data.lname = '';
            }else if(action.name==='username'){
                console.log("action.check -> ", action.check);
                state.data.username = regExp.username.test(action.value)&&action.check?'':'Invalid username! Atleast 6 characters';  
                if(!action.check) state.data.username = action.check===false?'Username already taken!':'';
            }else if(action.name==='email'){
                state.data.email = regExp.email.test(action.value)&&action.check?'':'Invalid email! Atleast 12 characters';
                if(!action.check) state.data.email = action.check===false?'Email already taken!':'';
            }else if(action.name==='pasword'){
                state.data.pasword = regExp.pasword.test(action.value)?'':'Invalid password! Atleast 8 characters';
                if(action.prev!==''){
                    state.data.confirm_pasword = (action.value===action.prev)?'':'Different password and confirm password!';
                }
            }else if(action.name==='confirm_pasword'){
                // console.log("prev => ", action.prev);
                state.data.confirm_pasword = (action.value===action.prev)?'':'Different password and confirm password!';
            }
            const {fname, lname, username, email, pasword, confirm_pasword} = state.data;
            state.data.valid = (fname || lname || username || email || pasword || confirm_pasword)? false: true;
            return {
                ...state,
                data: {
                    ...state.data
                }
            }
        default: return state;
    }
}

export default reducer1;