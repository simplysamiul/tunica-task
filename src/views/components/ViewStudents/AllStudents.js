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
import '../../../styles/Common.css';

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
        const count = data.count;
        const studentCount = Math.ceil(count / eachPageData);
        setTotalPage(studentCount)
        setLoading(false)
      });
  },[currentPage]);
  return (
    <>
    {loading ? <Preloader />
    :<div className='all-students-container'>
    <TableContainer component={Paper}>
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
          {students.map((student) => (
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
    </TableContainer>
    </div>}
    {/* table bottom section */}
    <TableBottom 
      setCurrentPage={setCurrentPage}
      totalPage={totalPage}
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