import Avatar from "@mui/joy/Avatar/Avatar";
import {useSelector, useDispatch} from 'react-redux';
import { clearDataSignup, makeChangeSignup, submitDataSignup, toggleSeen } from "../../redux/actions/signup_action";
import { signupChangeValidate } from "../../redux/actions/signup_action";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import MyModal from "./Modal";
import { useNavigate } from "react-router-dom";
import { updateMsgList, updateOnline } from "../../redux/actions/message_action";
import { sendOTP, verifyOTP } from "../../redux/actions/otp_actions";

const Signup = (props) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const otpData = useSelector(state=>state.verifyEmail);
    const list = useSelector(state => state.signupChange);
    const error = useSelector(state => state.signupError.data);
    const toggleHandler = useSelector(state=>state.togglerEye);
    const navigate = useNavigate();

    const [firstdigit,setFirstdigit] = useState("");
    const [sdigit,setSdigit] = useState("");
    const [tdigit,setTdigit] = useState("");
    const [fourthdigit,setFourthdigit] = useState("");

    const verifyEmail = (e)=>{
        e.preventDefault();
        let doc1 = document.getElementById('verify_email').classList;
        let doc2 = document.getElementById('otp_fields').classList;
        let doc3 = document.getElementById('resend_otp').classList;
        doc1.add('invisible');
        doc1.add('h-0');
        doc2.remove('invisible');
        doc2.remove('h-0');
        doc3.add('invisible');
        doc3.add('h-0');
        doc3.remove('mt-1.5');      
        dispatch(sendOTP(list.data.email));
    }
    
    const verifyOtp = (e)=>{
        e.preventDefault();
        let otp = firstdigit+sdigit+tdigit+fourthdigit;
        dispatch(verifyOTP(list.data.email,otp));
    }
    
    return (
        <div id="signup_page" className={`bg-gray-700 min-h-[570px] min-w-[340px] z-10 ${props.signup===true?'visible':'invisible'} sm:visible absolute sm:left-72 left-24 pb-6 rounded-3xl mt-[40px]`}>
            <div className="intro">
                <p className="text-white text-xl text-center pt-8 font-semibold">Welcome to our community</p>
                <div className="pt-8 flex justify-center"><Avatar/></div>
                <p className="text-white pt-2 text-center">Signup</p>
            </div>
            <div className="entryFields text-center">
                <form>
                    <div className="flex relative ml-[50px]">
                        <div className="mt-2">
                            <input type="text" name="fname" value={list.data.fname} onChange={(event)=>{
                                dispatch(makeChangeSignup(event.target));
                                dispatch(signupChangeValidate(event.target))
                            }} placeholder="Firstname" className="bg-gray-300 placeholder:text-slate-500 placeholder:text-center rounded-md mt-8 mr-2 p-[1px] w-[110px]"></input>
                            <p id="fname" className="text-red-500 text-xs text-start p-1">{error.fname}</p>
                        </div>
                        <div className="mt-6">
                            <input type="text" name="lname" value={list.data.lname} onChange={event=>{
                                dispatch(makeChangeSignup(event.target));
                                dispatch(signupChangeValidate(event.target))
                            }} placeholder="Lastname" className="bg-gray-300 placeholder:text-slate-500 placeholder:text-center rounded-md mt-4 ml-2 p-[1px] w-[110px]"></input><br/>
                            <p id="lname" className="text-red-500 text-xs text-start p-1">{error.lname}</p>
                        </div>
                    </div>
                    <div>
                        <input type="text" name="username" value={list.data.username} onChange={event=>{
                            dispatch(makeChangeSignup(event.target));
                            dispatch(signupChangeValidate(event.target))
                        }} placeholder="Username" className="bg-gray-300 placeholder:text-slate-500 placeholder:text-center rounded-md mt-2 p-[1px] w-60"></input><br/>
                        <p id="username" className="text-red-500 text-xs text-start pl-[50px] p-1">{error.username}</p>
                    </div>
                    <div>
                        <div>
                            <input type="email" name="email" value={list.data.email} onChange={event=>{
                                dispatch(makeChangeSignup(event.target));
                                dispatch(signupChangeValidate(event.target))
                            }} placeholder="Email" className="success_otp bg-gray-300 placeholder:text-slate-500 placeholder:text-center rounded-md mt-2 p-[1px] w-60"></input><br/>
                            <p id="email" className="text-red-500 text-xs text-start pl-[50px] p-1">{error.email}</p>
                        </div>
                        <div id='whole_otp_div' className="flex flex-col">
                            <button onClick={verifyEmail} id='verify_email' className="ml-auto mr-auto bg-green-600 rounded-md p-2 hover:bg-green-700 hover:text-white w-60 mt-0 mb-1">Verify Email</button>
                            <div id='otp_fields' className="invisible h-0">
                                <div className="relative flex flex-row space-x-2 ml-[50px]">
                                    <input type='text' value={firstdigit} onChange={(e)=>{setFirstdigit(e.target.value)}} maxLength='1' className="success_otp w-5"></input>
                                    <input type='text' value={sdigit} onChange={(e)=>{setSdigit(e.target.value)}} maxLength='1' className="success_otp w-5"></input>
                                    <input type='text' value={tdigit} onChange={(e)=>{setTdigit(e.target.value)}} maxLength='1' className="success_otp w-5"></input>
                                    <input type='text' value={fourthdigit} onChange={(e)=>{setFourthdigit(e.target.value)}} maxLength='1' className="success_otp w-5"></input>
                                    <button onClick={verifyOtp} id='verify_otp' className="success_otp w-32 rounded-md bg-green-600 p-1 text-white">Verify</button>
                                </div>
                                <div id='resend_otp' className="mt-1.5"><button onClick={verifyEmail} className="ml-auto mr-auto bg-red-600 rounded-md p-1 w-60">Resend OTP</button></div>
                                <p className={`otp_msg ${(otpData.success==="")?'text-red-500':'text-green-500'} text-xs text-start pl-[50px] p-1 w-[295px]`}>{otpData.error}{otpData.success}</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="relative">
                            <input id="pasword" type="password" name="pasword" value={list.data.pasword} onChange={event=>{
                                dispatch(makeChangeSignup(event.target));
                                dispatch(signupChangeValidate(event.target, list.data.confirm_pasword))
                            }} placeholder="Password" className="bg-gray-300 placeholder:text-slate-500 placeholder:text-center rounded-md mt-2 p-[1px] w-60"></input>
                            <button className="absolute top-2 right-14" onClick={(e)=>{dispatch(toggleSeen("pasword"));e.preventDefault()}}>
                                {toggleHandler.pasword?<FontAwesomeIcon icon={faEyeSlash} />:<FontAwesomeIcon icon={faEye} />}
                            </button>
                            <p className="text-red-500 text-xs text-start pl-[50px] p-1">{error.pasword}</p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="relative">
                            <input id="confirm_pasword" type="password" name="confirm_pasword" value={list.data.confirm_pasword} onChange={event=>{
                                dispatch(makeChangeSignup(event.target));
                                dispatch(signupChangeValidate(event.target, list.data.pasword))
                            }} placeholder="Confirm Password" className="bg-gray-300 placeholder:text-slate-500 placeholder:text-center rounded-md mt-2 p-[1px] w-60"></input>
                            <button className="absolute top-2 right-14" onClick={(e)=>{dispatch(toggleSeen("confirm_pasword"));e.preventDefault()}}>
                                {toggleHandler.confirm_pasword?<FontAwesomeIcon icon={faEyeSlash} />:<FontAwesomeIcon icon={faEye} />}
                            </button>
                        </div>
                        <p className="text-red-500 text-xs text-start pl-[50px] p-1">{error.confirm_pasword}</p>
                    </div>
                    <div>
                        <button onClick={async (e)=>{
                            dispatch(submitDataSignup(e, list.data, error.valid, list.valid,otpData.success));
                            setOpen(()=>{
                                return (error.valid&&list.valid&&(otpData.success==="Verified"))?false:true;
                            });
                            if(error.valid&&list.valid&&(otpData.success==="Verified")){
                                await dispatch(updateMsgList(list.data.username));
                                await dispatch(updateOnline(list.data.username,'Online'));
                                navigate(`/DashBoard/${list.data.username}`);
                            }
                            dispatch(clearDataSignup());
                            // submitBtn(e);
                        }} className="mt-4 bg-lime-500 w-60 p-2 hover:bg-lime-400 rounded-md font-semibold">Signup</button>
                        {open&&<MyModal open={open} setOpen={setOpen}/>}
                    </div>
                </form>
            </div>
            <div>
                <p className="text-white text-center pr-4 mt-8 ml-8 mb-4">If you have signed up already, then <button className="bg-gray-500 hover:bg-slate-400 rounded-md" name="login_page" onClick={props.manageUser}>login</button></p>
            </div>
        </div>
    );
}

export default Signup;