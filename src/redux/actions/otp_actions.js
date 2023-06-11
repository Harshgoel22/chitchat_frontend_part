import { BASE_URL } from "../base_url";
const { SEND_OTP, VERIFY_OTP } = require("./action_types");

export const sendOTP = (email)=>{
    return async function(dispatch){
        const data = await(await(fetch(`${BASE_URL}/sendotp`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email})
        }))).json();
        dispatch({
            type: SEND_OTP,
            success: data.success,
            error: data.error
        })
    }
}

export const verifyOTP = (email,otp)=>{
    return async function(dispatch){
        const data = await(await(fetch(`${BASE_URL}/verify`,{
            method: 'POST',
            body: JSON.stringify({email,otp}),
            headers: {
                'Content-Type': 'application/json'
            }
        }))).json();
        if(data.success==="Verified"){
            let doc3 = document.querySelectorAll('.success_otp');
            for(var i=0;i<doc3.length;i++){
                doc3[i].classList.add('pointer-events-none');
            }
        }
        else{
            let doc3 = document.getElementById('resend_otp').classList;
            doc3.remove('invisible');
            doc3.remove('h-0');
            doc3.add('mt-1.5');
        }
        dispatch({
            type: VERIFY_OTP,
            success: data.success,
            error: data.error
        })
    }
}