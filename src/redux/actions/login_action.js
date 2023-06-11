import { MAKE_CHANGE_LOGIN, TOGGLE_SEEN_LOGIN, LOGIN_CHANGE_VALIDATE, CLEAR_DATA_LOGIN, SUBMIT_DATA_LOGIN} from "./action_types"
import { BASE_URL } from "../base_url"

const makeChangeLogin = ({name, value},list)=> {
    return {
        type: MAKE_CHANGE_LOGIN,
        name: name,
        value: value
    }
}

export const toggleSeenLogin = (id)=>{
    return {
        type: TOGGLE_SEEN_LOGIN,
        id: id
    }
}

export const loginChangeValidate = ({name, value}, list, prev='')=>{
    console.log(name+" -> "+value);
    const {login_username, login_pasword} = list;
    console.log("login_username -> ", login_username);
    return async function(dispatch){
        try{
            const data = await(await fetch(`${BASE_URL}/getlogindata`,{
                method: 'POST',
                body:JSON.stringify({name: name, value: value, list: {login_username, login_pasword}}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })).json();
            console.log("data -> ", data);
            dispatch({
                type: LOGIN_CHANGE_VALIDATE,
                name: name,
                value: value,
                data: data,
                list: list,
                prev: prev
            })
        }catch(err){
            console.log(err);
            dispatch({
                type: LOGIN_CHANGE_VALIDATE,
                name: name,
                value: value,
                data: {studentRecord:{}, valid:false},
                list: list,
                prev: prev
            })
        }
    }
}

export const submitDataLogin = (list)=>{
    return async function(dispatch){
        try{
            await fetch(`${BASE_URL}/submitLoginData`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({list})
            })
            dispatch({
                type: SUBMIT_DATA_LOGIN,
                error: ''
            })
        }catch(err){
            console.log(err);
            dispatch({
                type: SUBMIT_DATA_LOGIN,
                error: 'glitches in database!'
            })
        }
    }
}

export const clearDataLogin = ()=>{
    return{
        type: CLEAR_DATA_LOGIN
    }
}
export default makeChangeLogin;