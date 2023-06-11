import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faVideo, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Message from './Message';
import Tooltip from '@mui/joy/Tooltip';
import MessageIcon from '@mui/icons-material/Message';
import { useState } from 'react';
import Video from '../Video';
import { updateOnline } from '../../redux/actions/message_action';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/logout_action';

const DashBoard = () => {
    const [toggler, setToggler] = useState("msg");
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async (iid)=>{
        let items = document.querySelectorAll('.icons');
        for(var i=0;i<items.length;i++){
            items[i].classList.remove('bg-gray-500');
        }
        document.getElementById(iid).classList.add('bg-gray-500');
        
        if(iid==='logout'){
            // handle logout here
            await dispatch(updateOnline(id,'Offline'));
            dispatch(logout(id));
            navigate('/');
        }
    }
    return (
        <div className="bg-gray-400 min-h-screen">
            <NavBar />
            <div className="flex relative h-[600px] w-[1200px] bg-gray-200 rounded-md mt-8 ml-auto mr-auto">
                <div className=" relative flex flex-col sidebar min-h-full w-14 rounded-tl-md pl-4 justify-center pb-14 rounded-bl-md space-y-6 bg-gray-700">
                    <div id='msg' onClick={()=>{handleClick('msg');setToggler('msg')}} className="icons h-12 w-12 p-3 hover:bg-gray-400 absolute left-1 top-8 rounded-full bg-gray-500">
                        <Tooltip title="Message" size="md">
                            <MessageIcon className='msg' sx={{color: 'white', scale: '1.2'}}/>
                        </Tooltip>
                    </div>
                    {/* <div id='video' onClick={()=>{handleClick('video');setToggler('video')}} className="icons h-12 w-12 p-3 hover:bg-gray-400 absolute left-1 top-56 rounded-full">
                        <Tooltip title="Video-Calling" size="md">
                            <FontAwesomeIcon icon={faVideo} size="xl" style={{ color: "white", }} />
                        </Tooltip>
                    </div>
                    <div id='rupee' onClick={()=>{handleClick('rupee');setToggler('rupee')}} className="icons h-12 w-12 p-3 hover:bg-gray-400 absolute left-1 top-[280px] rounded-full">
                        <Tooltip title="Payment" size="md">
                            <FontAwesomeIcon icon={faIndianRupeeSign} size="xl" style={{ color: "white", paddingLeft: "4px"}} />
                        </Tooltip>
                    </div> */}
                    <div id="logout" onClick={()=>{handleClick('logout');setToggler('logout')}} className="icons h-12 w-12 p-3 hover:bg-gray-400 absolute left-1 bottom-8 rounded-full">
                        <Tooltip title="Logout" size="md">
                            <FontAwesomeIcon icon={faRightFromBracket} size="xl" style={{ color: "white", }} />
                        </Tooltip>
                    </div>
                </div>
                {(toggler==="msg")?<Message/>:(toggler==="video")?<Video/>:null}
            </div>
        </div>
    );
}

export default DashBoard;