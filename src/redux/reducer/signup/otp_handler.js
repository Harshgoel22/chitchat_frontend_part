import { SEND_OTP, VERIFY_OTP } from "../../actions/action_types"

const initialState = {
    success: '',
    error: ''
}

export const reducer11 = (state=initialState,action)=>{
    switch(action.type){
        case SEND_OTP:
            return {
                ...state,
                error: action.error,
                success: action.success
            }
        case VERIFY_OTP:
            return {
                ...state,
                error: action.error,
                success: action.success
            }
        default:
            return state;
    }
}