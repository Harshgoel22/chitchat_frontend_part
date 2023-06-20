import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import DeleteModal from './DeleteModal';

export const SenderReply = (props)=>{
    const{itr1,data,username} = props;
    const [open, setOpen] = useState(false);
    const [del,setDel] = useState(false);

    const handleDelete = (e)=>{
        const id = e.target.classList[0];
        if(id.startsWith('del-')===true){
            let des = document.querySelectorAll('.delIcon');
            for(var i=0;i<des.length;i++){
                des[i].classList.add('invisible');
            }
            let d = document.getElementById(id);
            if(del===false){
                setDel(true);
                d.classList.remove('invisible');
            }else{
                setDel(false);
                d.classList.add('invisible');
            }
        }
    }

    return (
        <div key={itr1} className='relative flex flex-row ml-40 pr-4 lg:ml-80 xl:ml-96'>
            <div onClick={(e)=>{handleDelete(e)}} className={`del-${itr1} flex flex-row w-40 lg:w-64 xl:w-96 min-h-fit m-2 mr-0 p-1  rounded-2xl rounded-tr-none bg-green-400`}>
                <p className={`del-${itr1} p-1`}>{data.msg}</p>
            </div>
            <div id={`del-${itr1}`} onClick={()=>{setOpen(prev=>!prev)}} className={`delIcon invisible absolute -left-8 -top-0.5`}><DeleteIcon sx={{color: 'red'}}/></div>
            {(open===true)?<DeleteModal cond="send" itr={itr1} username={username} open={open} setOpen={setOpen}/>:null}
            <div className="w-8 h-8 m-1 p-0.5 rounded-full bg-gray-600">
                <p className='text-white font-bold'>You</p>
            </div>
        </div>
    )
}

export const ReceiverReply = (props)=>{
    const {fname, lname, data, itr1, username} = props;
    const [del, setDel] = useState(false);
    const [open, setOpen] = useState(false);

    const handleDelete = (e)=>{
        const id = e.target.classList[0];
        if(id.startsWith('del-')===true){
            let des = document.querySelectorAll('.delIcon');
            for(var i=0;i<des.length;i++){
                des[i].classList.add('invisible');
            }
            let d = document.getElementById(id);
            if(del===false){
                setDel(true);
                d.classList.remove('invisible');
            }else{
                setDel(false);
                d.classList.add('invisible');
            }
        }
    }

    return (
        <div key={itr1} className='flex flex-row relative pl-4'>
            <div className="w-8 h-8 m-1.5 p-1 rounded-full flex flex-row space-x-0.5 bg-gray-600">
                <p className='text-white font-bold'>{fname.slice(0,1)}</p>
                <p className='text-white font-bold'>{lname.slice(0,1)}</p>
            </div>
            {(open===true)?<DeleteModal cond="receive" itr={itr1} username={username} open={open} setOpen={setOpen}/>:null}
            <div onClick={(e)=>{handleDelete(e)}} className={`del-${itr1} flex flex-row p-1 w-40 min-h-fit lg:w-64 xl:w-96 m-2 ml-0 rounded-2xl rounded-tl-none bg-green-100`}>
                <p className={`del-${itr1} p-1`}>{data.msg}</p>
            </div> 
            <div id={`del-${itr1}`} onClick={()=>{setOpen(prev=>!prev)}} className={`delIcon invisible absolute left-60 lg:left-[330px] xl:left-[460px] -top-0.5`}><DeleteIcon sx={{color: 'red'}}/></div>
        </div>
    )
}