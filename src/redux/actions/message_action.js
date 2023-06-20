import { ON_CHANGE_SEARCH, UPDATE_RECENT_TAB, UPDATE_MSG_LIST, UPDATE_ONLINE, DELETE_CARD, DELETE_MSG, SEND_MSG, SET_SEARCH_LOADER, SET_MSG_BOOL} from "./action_types";
import { BASE_URL } from "../base_url";

export const onChangeSearch = (searchTag, id)=>{
    return async function(dispatch){
        dispatch(setSearchLoader(true));
        const data = await (await fetch(`${BASE_URL}/onChangeSearch`,{
            method: 'POST',
            body:JSON.stringify({searchTag, id}),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();
        console.log(`searching_results: ${data}`);
        dispatch(setSearchLoader(false));
        dispatch({
            type: ON_CHANGE_SEARCH,
            data: data
        })
    }
}

export const updateRecentTab = (username, id,addition='yes')=>{
    return async function(dispatch){
        const data = await (await fetch(`${BASE_URL}/updateRecentTab`,{
            method: 'POST',
            body:JSON.stringify({username, id, addition}),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();
        console.log(`recent_tab_Data: ${data}`);
        dispatch({
            type: UPDATE_RECENT_TAB,
            data: data
        })
    }
}

export const updateMsgList = (sender)=>{
    return async function(dispatch){
        const data = await( await fetch(`${BASE_URL}/getSenderData`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({sender})
        })).json();
        dispatch({
            type: UPDATE_MSG_LIST,
            list: data
        })
    }
}

export const updateOnline = (id, text)=>{
    return async function(dispatch){
        const data = await (await fetch(`${BASE_URL}/updateOnline`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id,text})
        })).json();
        dispatch({
            type: UPDATE_ONLINE,
            data: data
        })
    }
}

export const deleteCard = (username,id,fname, lname, active)=>{
    return async function(dispatch){
        const data = await (await fetch(`${BASE_URL}/deleteCard`,{
            method: 'POST',
            body: JSON.stringify({username,id,fname, lname, active}),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();
        dispatch({
            type: DELETE_CARD,
            data: data[0],
            msgData: data[1]
        })
    }
}

export const deleteMsg = (id,username,condition,index)=>{
    return async function(dispatch){
        const data = await(await fetch(`${BASE_URL}/deleteMsg`,{
            method: 'POST',
            body: JSON.stringify({id,username,condition,index}),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();
        dispatch({
            type: DELETE_MSG,
            data: data
        })
    }
}

export const sendMessage = (sender,receiver,msg)=>{
    return async function(dispatch){
        const data = await (await fetch(`${BASE_URL}/sendMsg`,{
            method: 'POST',
            body: JSON.stringify({sender,receiver,msg}),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();
        dispatch({
            type: SEND_MSG,
            data: data
        })
    }
}

export const setSearchLoader = (value)=>{
    return {
        type: SET_SEARCH_LOADER,
        value: value
    }
}

export const setMsgBool = (value)=>{
    return {
        type: SET_MSG_BOOL,
        value: value
    }
}