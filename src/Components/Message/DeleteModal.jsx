import {Modal} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteMsg } from '../../redux/actions/message_action';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:5000");

const DeleteModal = (props)=>{
    const {username,itr,cond} = props;
    const {id} = useParams();
    const dispatch = useDispatch();

    return (
        <Modal
        open={props.open}
        onClose={()=>{props.setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="mt-[20%] ml-[42%] min-h-fit flex flex-col justify-center bg-gray-800 min-h-20 w-64 rounded-lg p-4 px-5">
            <div onClick={async ()=>{
                await dispatch(deleteMsg(id,username,'myself',itr));
                socket.emit("delMessage",({itr}));
                props.setOpen(false)
            }} className='text-white pl-6 text-lg hover:bg-gray-100 hover:text-gray-800 hover:font-extrabold hover:rounded-xl'><p>Delete for myself</p></div>
            <div onClick={async ()=>{
                await dispatch(deleteMsg(id,username,'everyone',itr));
                socket.emit("delMessage",({itr}));
                props.setOpen(false)
            }} className={`${cond==='receive'?'invisible':null} text-white pl-6 text-lg hover:bg-gray-100 hover:text-gray-800 hover:font-extrabold hover:rounded-xl`}><p>Delete for everyone</p></div>
        </div>
      </Modal>
    )
}

export default DeleteModal;