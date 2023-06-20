import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faVideo, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Message from './Message';
import Tooltip from '@mui/joy/Tooltip';
import MessageIcon from '@mui/icons-material/Message';
// import { useState } from 'react';
import { updateOnline } from '../../redux/actions/message_action';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/logout_action';

const DashBoard = () => {
    // const [toggler, setToggler] = useState("msg");
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const msgBool = useSelector(state=>state.onChangeSearch.boolean);

    const handleClick = async (iid)=>{
        let items = document.querySelectorAll('.icons');
        for(var i=0;i<items.length;i++){
            items[i].classList.remove('bg-gray-500');
        }
        document.getElementById(iid).classList.add('bg-gray-500');
        
        if(iid==='logout'){
            // handle logout here
            await dispatch(updateOnline(id,'Offline'));
            await dispatch(logout(id));
            navigate('/');
        }
    }
    return (
        <div className="bg-gray-400 min-h-screen overflow-x-hidden">
            <NavBar />
            <div className={`flex relative h-[600px] w-[376px] lg:w-[1000px] xl:w-[1200px] bg-gray-200 rounded-md mt-8 ml-auto mr-auto`}>
                <div className=" relative flex flex-col sidebar min-h-full w-14 rounded-tl-md pl-4 justify-center pb-14 rounded-bl-md space-y-6 bg-gray-700">
                    <div id='msg' onClick={()=>{handleClick('msg')}} className="icons h-12 w-12 p-3 hover:bg-gray-400 absolute left-1 top-8 rounded-full bg-gray-500">
                        <Tooltip title="Message" size="md">
                            <MessageIcon className='msg' sx={{color: 'white', scale: '1.2'}}/>
                        </Tooltip>
                    </div>
                    <div id="logout" onClick={()=>{handleClick('logout')}} className="icons h-12 w-12 p-3 hover:bg-gray-400 absolute left-1 bottom-8 rounded-full">
                        <Tooltip title="Logout" size="md">
                            <FontAwesomeIcon icon={faRightFromBracket} size="xl" style={{ color: "white", }} />
                        </Tooltip>
                    </div>
                </div>
                <Message/>
            </div>
        </div>
    );
}

export default DashBoard;