import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import '../../../styles/Common.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteStudent({ delet, setDelet, deleteId, setStudents, students }) {
  const handleClose = () => {setDelet(false)};
  const handleDelete = () =>{
    const url = `https://obscure-wildwood-24223.herokuapp.com/removestudent/${deleteId}`;
    fetch(url,{
      method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
      if(data.deletedCount > 0){
      const afterDelete = students.filter((items) => items._id !== deleteId)
      setStudents(afterDelete)
      }
    })
    setDelet(false);
  }
  
  return (
    <div>
      <Dialog
        open={delet}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
            Are You want to delete this student's information permanently?
        </DialogContent>
        <DialogActions>
          <button className=" btn delete-button" onClick={handleDelete}>Yes</button>
          <button className=' btn close-button' onClick={handleClose}>No</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
