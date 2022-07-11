import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import formLogo from '../../../assets/logo2.svg';
import { useForm } from 'react-hook-form';
import { Alert, CircularProgress } from '@mui/material';
import '../../../styles/EditStudent.css';

const style = {
  position: 'absolute',
  top: '58%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  color: "white",
  borderTopLeftRadius: "60px",
  borderBottomRightRadius: "60px",
  boxShadow: 24,
  p: 2,
};

export default function EditStudent({ edit, setEdit, editId }) {
  const handleClose = () => setEdit(false);
  const [loading, setLoading] = React.useState(false);
    const [addSuccessfully, setAddSuccessfully] = React.useState(false);
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        console.log(data);
        setLoading(true);
        const url = `https://obscure-wildwood-24223.herokuapp.com/updatestudent/${editId}`;
        fetch(url, {
            method: "PUT",
            headers:{
                "content-type" : "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
            setLoading(false);
            setAddSuccessfully(true);
            if(data.modifiedCount > 0){
              window.location.reload(false);
            } 
            reset();
        }) 
    };

  return (
    <div>
      <Modal
        open={edit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="modal-area">
                <div className="modal-form">
                    <img src={formLogo} alt="" />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input placeholder='Name*' {...register("name")} required />
                            <input {...register("birth_date")} type="date" required />
                            <input placeholder='School*' {...register("school")} required />
                            <input placeholder='Class*' {...register("class")} required />
                            <input placeholder='Division*' {...register("division")} required />
                            <label className="status-field">
                                <input {...register("status")} type="radio" id="active" value="active" required/>Active
                                <input {...register("status")} type="radio" id="active" value="inactive" required/>Inactive
                            </label>
                            {loading && <CircularProgress color="secondary" />}
                            <button type='submit'>Submit</button>
                            <div className="notification">
                            </div>
                        </form>
                        {addSuccessfully && <Alert severity="success">Student Edit Successfully !!</Alert>}
                </div>
            </div>
        </Box>
      </Modal>
    </div>
  );
}
