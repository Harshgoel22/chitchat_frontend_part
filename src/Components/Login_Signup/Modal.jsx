import {Typography, Modal} from '@mui/material';

const MyModal = (props)=>{

    return (
        <Modal
        open={props.open}
        onClose={()=>{props.setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="mt-60 ml-[30%] xl:ml-[42%] bg-gray-700 min-h-20 w-64 rounded-lg p-4 px-5">
          <Typography id="modal-modal-title" variant="h6" component="h2" className='text-white font-bold text-lg'>
            Error
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} className="text-white font-md">
            Sorry! Invalid Credentials.
          </Typography>
          <button onClick={()=>{props.setOpen(false)}} className="bg-white rounded-lg font-semibold text-md w-10 pr-1 ml-44 mt-2">OK</button>
        </div>
      </Modal>
    )
}

export default MyModal;