import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../images/chitchat_logo.png';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import Avatar from '@mui/joy/Avatar';
import Tooltip from '@mui/joy/Tooltip';
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { updateOnline } from '../../redux/actions/message_action';
import { useParams } from 'react-router-dom';

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const {id} = useParams();
    const dispatch = useDispatch();
    const userInfo = useSelector(state=>state.updateOnline.payload);
    useEffect(()=>{
        dispatch(updateOnline(id));
    },[dispatch,id])
    return (
        <div className="navbar bg-gray-800 min-h-[70px] flex flex-row justify-between">
            <div className="logo">
                <img src={logo} alt='logo' className="max-h-[68px] pl-6 pt-2 pb-2"></img>
            </div>
            <div className="account-details flex flex-row mr-10 space-x-4">
                <Tooltip title="avatar" size="md">
                    <button variant="solid"><Avatar/></button>
                </Tooltip>
                <button onClick={()=>{setOpen(prev=>{return !prev})}} variant="solid">
                    <FontAwesomeIcon icon={faAngleDown} size="xl" style={{color: "#474E68",}} />
                </button>
                {(open===true)?
                    ((Object.keys(userInfo).length!==0)?
                        <div className='flex flex-col absolute min-w-fit min-h-fit right-12 top-12 z-10 bg-slate-50 bg-opacity-60 rounded-lg rounded-tr-none'>
                            <div className='flex flex-row ml-auto mr-auto text-white font-extrabold h-10 w-10 m-2 p-2 rounded-full bg-gray-700'>
                                <p>{userInfo.fname.slice(0,1)}</p>
                                <p>{userInfo.lname.slice(0,1)}</p>
                            </div>
                            <div className='pl-5 pr-5'>
                                <p>Name: </p>
                                <div className='flex flex-row space-x-1'>
                                    <p className='font-extrabold'>{userInfo.fname}</p>
                                    <p className='font-extrabold'>{userInfo.lname}</p>
                                </div>
                            </div>
                            <div className='pl-5 pr-5'>
                                <p>Username: </p>
                                <div>
                                    <p className='font-extrabold'>{userInfo.username}</p>
                                </div>
                            </div>
                            <div className='pl-5 pr-5 mb-2'>
                                <p>Email: </p>
                                <div>
                                    <p className='font-extrabold'>{userInfo.email}</p>
                                </div>
                            </div>
                        </div> :
                        <div className='flex flex-col items-center justify-center absolute w-40 h-40 right-12 top-12 z-10 bg-slate-50 bg-opacity-60 rounded-lg rounded-tr-none'>
                            <p className='font-bold text-2xl text-black'>Invalid User</p>
                        </div>
                    ):null
                }
            </div>
        </div>
    );
}

export default NavBar;