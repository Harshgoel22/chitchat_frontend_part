import reducer2 from './signup/make_change_signup';
import reducer1 from './signup/signup_reducer';
import reducer3 from './signup/toggleSeen';
import reducer4 from './signup/submit_data_signup';
import { reducer5 } from './login/make_change_login';
import reducer6 from './login/toggleSeenLogin';
import reducer7 from './login/login_change_validate';
import reducer8 from './login/submit_login_data';
import { reducer9 } from './message/onChange_Search';
import { reducer10 } from './message/updateOnline';
import { reducer11 } from './signup/otp_handler';

const redux = require('redux');
const combineReducers = redux.combineReducers;

const rootReducer = combineReducers({
    signupChange: reducer2,
    signupError: reducer1,
    togglerEye: reducer3,
    signupSubmit: reducer4,
    loginChange: reducer5,
    toggleSeenLogin: reducer6,
    loginchangeValidate: reducer7,
    submitDataLogin: reducer8,
    onChangeSearch: reducer9,
    updateOnline: reducer10,
    verifyEmail: reducer11
});

export default rootReducer;