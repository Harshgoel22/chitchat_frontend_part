import { LOGOUT } from "./action_types";
import { BASE_URL } from "../base_url";

export const logout = (id)=>{
    return async function(dispatch){
        await fetch(`${BASE_URL}/logout`,{
            method: 'POST',
            body: JSON.stringify({id}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        dispatch({
            type: LOGOUT
        })
    }
}