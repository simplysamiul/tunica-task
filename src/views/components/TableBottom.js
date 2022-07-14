import { Pagination } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useReactToPrint } from 'react-to-print';
import '../../styles/TableBottom.css';

const TableBottom = ({setCurrentPage, totalPage, componentRef}) => {
    const handelPrint = useReactToPrint({
        content : () => componentRef.current,
    });
    return (
        <div className='section-area'>
            <div className="section-container">
                <div className="download-button">
                    <button onClick={handelPrint}><span>Download PDF</span> <DownloadIcon /></button>
                </div>
                <div className="pagination">
                <Pagination 
                        count={totalPage}
                        color="primary" 
                        onChange={(e, value)=> setCurrentPage(value)}
                        />
                </div>
            </div>
        </div>
    );
};

export default TableBottom;