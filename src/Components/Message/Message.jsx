import { useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { onChangeSearch, updateOnline } from '../../redux/actions/message_action';
import { logout } from '../../redux/actions/logout_action';
import SortIcon from '@mui/icons-material/Sort';
import Card from './Card';
import Tooltip from '@mui/joy/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { MsgRightBlock } from './msgRightBlock';
import MoonLoader from "react-spinners/MoonLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Message = ()=>{
    
    let itr=0;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const list = useSelector(state=>state.onChangeSearch.payload);
    const msgData = useSelector(state=>state.onChangeSearch.msgData);
    // console.log(`msgData: ${msgData}`);
    const [listt, setList] = useState([]);
    const loader = useSelector(state=>state.onChangeSearch.loader);
    const msgBool = useSelector(state=>state.onChangeSearch.boolean);

    const [msg,setMsg] = useState("");
    const [search, setSearch] = useState("");
    const {id} = useParams();

    useEffect(()=>{
        dispatch(onChangeSearch(search, id));
    },[dispatch,search,id]);

    return (
        <div className="main-div relative flex flex-row bg-gray-200 rounded-tr-md rounded-br-md ">
            <div className={`absolute lg:visible lg:relative flex flex-col left-part ${(msgBool===false)?'visible':'invisible'} min-h-full w-80 bg-gray-300 rounded-lg lg:rounded-none`}>
                <div className="upper-part flex flex-row p-6 pb-0">
                    <SortIcon style={{margin:"4px"}}/>
                    <h1 className="text-xl font-bold font-sans">Messages</h1>
                    <div className="lg:invisible icons h-10 w-10 p-2 hover:bg-gray-400 absolute right-4 -top-1 mt-6 rounded-full" onClick={async ()=>{
                        await dispatch(updateOnline(id,'Offline'));
                        await dispatch(logout(id));
                        navigate('/');
                    }}>
                        <Tooltip title="Logout" size="md">
                            <FontAwesomeIcon icon={faRightFromBracket} size="xl" style={{scale: '0.9' }} />
                        </Tooltip>
                    </div>
                </div>
                <div className="searchBar relative h-4 w-72 ml-auto mr-auto mt-2 p-4 rounded-md">
                    <input value={search} onChange={(e)=>{
                        setSearch(e.target.value);
                        dispatch(onChangeSearch(e.target.value, id))
                    }} className="p-1.5 top-0 w-72 right-0 absolute rounded-md bg-gray-200" placeholder='   🔍  Search'></input>
                </div>
                <div className="lower-div relative flex flex-col overflow-y-auto overflow-x-hidden">
                    <div className="mt-4 ml-2">
                        {list.map((data)=>{
                            itr++;
                            return (
                                <Card key={itr} index={itr} msg={msg} setList={setList} active={msgData.username} setSearch={setSearch} {...data}/>
                            )
                        })}
                    </div>
                </div>
            </div>    
            {loader?
                <div className='absolute left-32 top-44'>
                    <MoonLoader
                        loading={loader}
                        size={50}
                        color={'red'}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            :null}     
            {/* right msg block */}
            {(Object.keys(msgData).length===0) ? 
                <div className="xl:text-3xl lg:text-2xl absolute top-48 invisible lg:visible xl:left-[180%] lg:left-[160%] text-center lg:w-60">
                    <p>Search to connect with your friends and relatives</p>
                </div> : 
                <MsgRightBlock msg={msg} setMsg={setMsg} sender={id} list={listt} setList={setList} {...msgData}/>
            }
        </div>
    )
}

export default Message;