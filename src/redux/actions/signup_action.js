import {SIGNUP_CHANGE_VALIDATE, MAKE_CHANGE_SIGNUP, SUBMIT_DATA_SIGNUP} from "./action_types";
import { CLEAR_DATA_SIGNUP, TOGGLE_SEEN } from "./action_types";
import { BASE_URL } from "../base_url";

const signupChangeValidate =  ({name, value}, prev='')=> {
    return async function(dispatch){
        try{
            const bool = await (await fetch(`${BASE_URL}/getdata`,{
                method: 'POST',
                body: JSON.stringify({name: name, value: value}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })).json();
            console.log("bool -> ",bool);
            const valid = (bool.length===0)?true:false;
            console.log("valid -> ",valid);
            dispatch({
                type: SIGNUP_CHANGE_VALIDATE, 
                name: name,
                prev: prev,
                value: value,
                check: valid
            }) 
        }catch(e){
            console.log(e);
            dispatch({
                type: SIGNUP_CHANGE_VALIDATE, 
                name: name,
                prev: prev,
                value: value,
                check: false
            })
        }
    }
}

const makeChangeSignup = ({name, value})=> {
    return {
        type: MAKE_CHANGE_SIGNUP,
        name: name,
        value: value
    }
}

const toggleSeen = (id) => {
    return {
        type: TOGGLE_SEEN,
        id: id
    }
}

const submitDataSignup = (e, data, valid1, valid2, cond) => {
    return async function(dispatch){
        try{
            if(cond==="Verified"){
                await fetch(`${BASE_URL}/signup`,{
                    method: 'POST',
                    body: JSON.stringify({data, valid1, valid2}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            dispatch({
                type: SUBMIT_DATA_SIGNUP,
                event: e,
                loading: false,
                error: ''
            })
        }catch(err){
            console.log("Error in submit_data_signup.js");
            dispatch({
                type: SUBMIT_DATA_SIGNUP,
                event: e,
                loading: false,
                error: 'glitch in database!'
            })
        }
    }
}

export const clearDataSignup = () => {
    return {
        type: CLEAR_DATA_SIGNUP
    }
}

export {makeChangeSignup, signupChangeValidate, toggleSeen, submitDataSignup};