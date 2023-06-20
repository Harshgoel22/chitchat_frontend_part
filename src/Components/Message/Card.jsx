import Avatar from "@mui/joy/Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { updateRecentTab, onChangeSearch, updateMsgList, deleteCard, setMsgBool } from "../../redux/actions/message_action";
import { useParams } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useState} from "react";

const Card = (props)=>{
    const {id} = useParams();
    const dispatch = useDispatch();
    const recMsg = useSelector(state=>state.onChangeSearch.chatData);

    let text='',sent='';
    recMsg.map((items)=>{
        return (items.username===props.username)? items.data.map((item)=>{
            return (
                text=item.msg,
                sent=item.sent
            )
        }): null;
    })
    if(text!=="") text = (sent==='send')? 'You : '+text.slice(0,10)+' . . .' : props.username+' : '+text.slice(0,10)+' . . .';

    const handleCSS = (e)=>{
        if(e.target.id!==null){
            let items = document.querySelectorAll('.card');
            for(var i=0;i<items.length;i++){
                items[i].classList.remove('bg-gray-800');
            }
            let des = document.getElementById(e.target.id);
            if(des!==null) des.classList.add('bg-gray-800');
        }
    }

    const handleJs = async (e)=>{
        if(e.target.classList.length!==0){
            // console.log(e.target.d);
            dispatch(updateMsgList(id));
            await dispatch(updateRecentTab(props.username, id));
            props.setSearch("");
            dispatch(onChangeSearch("", id));
            props.setList([]);
        }
        // console.log(e.target.classList.length);
    }

    const [dot, setDot] = useState(false);
    const [del, setDel] = useState(false);
    const styles = {
        position: 'absolute',
        color: 'red',
        top: '-25px',
        right: '-32px'
    }

    return (
        <div id={props.index} onMouseOver={()=>{setDot(true)}} onMouseLeave={()=>{setDot(false)}} onClick={(e)=>{ handleJs(e); handleCSS(e)}} 
                className="card hover:bg-gray-700 relative flex flex-row card w-72 h-[65px] rounded-md m-2 p-2.5 mt-0 bg-gray-600"
                onDoubleClick={()=>{dispatch(setMsgBool(true));}}>
            {(dot===true)?
                <div className="text-white absolute right-3 top-4" onClick={()=>{setDel((prev)=>{return !prev})}}>
                    <MoreVertIcon/>
                    {(del===true)?
                        <div onClick={()=>{dispatch(deleteCard(props.username, id, props.fname, props.lname, props.active))}}>
                            <DeleteIcon sx={styles}/>
                        </div>:null
                    }
                </div>:null
            }
            <Avatar sx={{margin: "2px"}}/>
            <div className="absolute -top-0 left-12 text-slate-100 min-w-full">
                <h1 className="font-bold absolute top-1 left-4">{props.fname} {props.lname}</h1>
                <p className="text-xs absolute left-4 top-6 mt-0.5">{props.username}</p>
                <p className="text-sm absolute top-10 left-4 text-green-400">{text}</p>
            </div>
        </div>
        
    )
}

export default Card;