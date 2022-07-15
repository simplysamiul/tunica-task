import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditStudent from './EditStudent';
import DeleteStudent from './DeleteStudent';
import Preloader from '../../custome/Preloader';
import TableBottom from '../TableBottom';
import { useForm } from "react-hook-form";
import '../../../styles/Common.css';
import '../../../styles/SearchData.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ad2626",
    color: "white",
    fontSize: "16px"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  }
}));

export default function AllStudents() {
  // Student Edit Modal
  const [edit, setEdit] = React.useState(false);
  const [editId, setEditId] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleOpen = (id) => {
    setEditId(id);
    setEdit(true);
  };
  // Delete Student Modal
  const [delet, setDelet] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const handleClickOpen = (id) => {
    setDeleteId(id);
    setDelet(true)
  };
  // For pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const eachPageData = 9;
  // Show all students data
  const [students, setStudents] = React.useState([]);
  React.useEffect(()=>{
      setLoading(true)
      fetch(`https://ronchon-chocolatine-52670.herokuapp.com/allstudents?page=${currentPage}&&pagedata=${eachPageData}`)
      .then(res => res.json())
      .then(data => {
        setStudents(data.studentsData);
        setFilterStudent(data.studentsData)
        const count = data.count;
        const studentCount = Math.ceil(count / eachPageData);
        setTotalPage(studentCount)
        setLoading(false)
      });
  },[currentPage]);
  // For download as a pdf
  const componentRef = React.useRef();
  // For search student data
  const [filterStudent, setFilterStudent] = React.useState([]);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = data => {
    
    const filterData = students.filter((student) =>{
      const filter = student.name.toLowerCase() === data.name.toLowerCase() && 
      student.school.toLowerCase() === data.school.toLowerCase() && 
      student.className.toString() === data.className.toString() && 
      student.division.toLowerCase() === data.division.toLowerCase() ;
      return filter;
    })
    setFilterStudent(filterData);
    reset();
  
  };
  return (
    <>
    {loading ? <Preloader />
    :<div className='all-students-container'>
      {/* student data search field */}
      <div className='search-field-area'>
            <div className="search-field-container">
                <div className="search-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="Name*" {...register("name", { required: true })} />
                    <input type="text" placeholder='School*' {...register("school", { required: true })} />
                    <input type="number" placeholder='Class*' {...register("className", { required: true })} />
                    <input type="text" placeholder='Division*' {...register("division", { required: true })} />
                    <button className="search-button" type="submit">Search</button>
                </form>
                </div>
            </div>
        </div>
    {filterStudent.length === 0 ? <h3 style={{textAlign:"center", padding:"20px"}}>Student not found !</h3>
      :<TableContainer ref={componentRef} component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">School</StyledTableCell>
            <StyledTableCell align="right">Class</StyledTableCell>
            <StyledTableCell align="right">Division</StyledTableCell>
            <StyledTableCell align="right">Birth Date</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Manage</StyledTableCell>
          </TableRow>
        </TableHead>
         <TableBody>
          {filterStudent.map((student) => (
            <StyledTableRow key={student._id}>
              <StyledTableCell component="th" scope="row">
                {student.name}
              </StyledTableCell>
              <StyledTableCell align="right">{student.school}</StyledTableCell>
              <StyledTableCell align="right">{student.className}</StyledTableCell>
              <StyledTableCell align="right">{student.division}</StyledTableCell>
              <StyledTableCell align="right">{student.birth_date}</StyledTableCell>
              <StyledTableCell align="right">{student.status}</StyledTableCell>
              <StyledTableCell align="right">
                <button className="btn edit-button" onClick={()=> handleOpen(student._id)}>Edit</button> 
                <button className="btn delete-button" variant="outlined" onClick={()=> handleClickOpen(student._id)}>Delete</button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
    </div>}
    {/* table bottom section */}
    <TableBottom 
      setCurrentPage={setCurrentPage}
      totalPage={totalPage}
      componentRef={componentRef}
    />
    {/* Edit component */}
    <EditStudent
    editId={editId} 
    edit={edit}
    setEdit={setEdit}
    students={students}
    />
    {/* delete component */}
    <DeleteStudent
    deleteId={deleteId}
    delet={delet}
    setDelet={setDelet}
    setStudents={setStudents}
    students={students}
    />
    </>
  );
}