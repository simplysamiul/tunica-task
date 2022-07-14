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

export default function EditStudent({ edit, setEdit, editId, students }) {
  const handleClose = () => setEdit(false);
  const [loading, setLoading] = React.useState(false);
  const [addSuccessfully, setAddSuccessfully] = React.useState(false);

    // student update 
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        // get specific data
        const studentData = students.filter((student) => student._id === editId)
        const specificData = studentData[0];
        const name = data.name ? data.name : specificData.name;
        const birth_date = data.birth_date ? data.birth_date : specificData.birth_date;
        const school = data.school ? data.school : specificData.school;
        const className = data.className ? data.className : specificData.className;
        const division = data.division ? data.division : specificData.division;
        const status = data.status ? data.status : specificData.status;
        const editedData = {name, birth_date, school, className, division, status};




        setLoading(true);
        const url = `http://localhost:5000/updatestudent/${editId}`;
        fetch(url, {
            method: "PUT",
            headers:{
                "content-type" : "application/json"
            },
            body: JSON.stringify(editedData)
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
                            <input placeholder='Name*' {...register("name")} />
                            <input {...register("birth_date")} type="date" />
                            <input placeholder='School*' {...register("school")} />
                            <input placeholder='Class*' {...register("className")} />
                            <input placeholder='Division*' {...register("division")} />
                            <label className="status-field">
                                <input {...register("status")} type="radio" id="active" value="active" />Active
                                <input {...register("status")} type="radio" id="active" value="inactive" />Inactive
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
