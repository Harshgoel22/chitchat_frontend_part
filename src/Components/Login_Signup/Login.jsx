import Avatar from "@mui/joy/Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import makeChangeLogin, { clearDataLogin, loginChangeValidate, submitDataLogin, toggleSeenLogin } from "../../redux/actions/login_action";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyModal from "./Modal";
import { updateMsgList, updateOnline } from "../../redux/actions/message_action";

const Login = (props) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const list = useSelector(state => state.loginChange);
    const toggle = useSelector(state => state.toggleSeenLogin);
    const error = useSelector(state => state.loginchangeValidate);
    const navigate = useNavigate();

    return (
        <div id="login_page" className="bg-gray-400 min-h-[500px] min-w-[320px] max-w-[340px] rounded-3xl mt-24 z-0 pb-6 left-80 absolute">
            <div className="intro">
                <p className="text-white text-xl text-center pt-8 font-semibold">Welcome Back!</p>
                <p className="text-white text-sm text-center mt-1">Login to continue</p>
                <div className="pt-6 flex justify-center"><Avatar/></div>
                <p className="text-white pt-2 text-center">Login</p>
            </div>
            <div className="entryFields text-center">
                <form className="space-y-[1px]">
                    <div className="relative">
                        <input onChange={(e)=>{
                            dispatch(makeChangeLogin(e.target));
                            dispatch(loginChangeValidate(e.target, list));
                        }} value={list.login_username} type="text" name="login_username" placeholder="Username" className="bg-gray-300 placeholder:text-slate-500 placeholder:text-center rounded-md mt-8 p-[2px] w-60"></input>
                        <p className="text-red-500 text-xs text-start pl-10 pt-0.5">{error.login_username}</p>
                    </div>
                    <div className="relative">
                        <div className="relative">
                            <input onChange={e=>{
                                dispatch(makeChangeLogin(e.target));
                                dispatch(loginChangeValidate(e.target, list, list.login_confirm_pasword))
                            }} id="login_pasword" type="password" name="login_pasword" value={list.login_pasword} placeholder="Password" className="bg-gray-300 placeholder:text-slate-500 placeholder:text-center rounded-md mt-2 p-[2px] w-60"></input>
                            <button onClick={(e)=>{
                                dispatch(toggleSeenLogin("login_pasword"));
                                e.preventDefault()
                            }} className="absolute top-2 right-14">
                                {toggle.login_pasword?<FontAwesomeIcon icon={faEyeSlash}/>:<FontAwesomeIcon icon={faEye} />}
                            </button>
                            <p className="text-red-500 text-xs text-start pl-10 pt-0.5">{error.login_pasword}</p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="relative">
                            <input onChange={e=>{
                                dispatch(makeChangeLogin(e.target));
                                dispatch(loginChangeValidate(e.target, list, list.login_pasword))
                            }} id="login_confirm_pasword" type="password" name="login_confirm_pasword" value={list.login_confirm_pasword} placeholder="Confirm Password" className="bg-gray-300 placeholder:text-slate-500 placeholder:text-center rounded-md mt-2 p-[2px] w-60"></input>
                            <button onClick={(e)=>{
                                dispatch(toggleSeenLogin("login_confirm_pasword"));
                                e.preventDefault()
                            }} className="absolute top-2 right-14">
                                {toggle.login_confirm_pasword?<FontAwesomeIcon icon={faEyeSlash}/>:<FontAwesomeIcon icon={faEye} />}
                            </button>
                        </div>
                        <p className="text-red-500 text-xs text-start pl-10 pt-0.5">{error.login_confirm_pasword}</p>
                    </div>
                    <div>
                        <button onClick={(e)=>{
                            setOpen(async ()=>{
                                e.preventDefault();
                                dispatch(submitDataLogin(list));
                                if(list.valid && error.valid){
                                    await dispatch(updateMsgList(list.login_username));
                                    await dispatch(updateOnline(list.login_username,'Online'));
                                    navigate(`/DashBoard/${list.login_username}`);         
                                }
                                dispatch(clearDataLogin());
                                return (list.valid && error.valid)?false:true
                            })
                        }} className="mt-4 bg-lime-500 w-60 p-1 rounded-md font-semibold">Login</button>
                        {open&&<MyModal open={open} setOpen={setOpen}/>}
                    </div>
                </form>
            </div>
            <div>
                <p className="text-white text-center pr-2 mt-8 ml-8">If you haven't signed up already, then <button className="bg-gray-500 hover:bg-gray-300 rounded-md" name="signup_page" onClick={props.manageUser}>signup</button></p>
            </div>
        </div>
    );
}

export default Login;