import { Pagination } from '@mui/material';
import '../../styles/TableBottom.css';

const TableBottom = ({setCurrentPage, totalPage}) => {
    return (
        <div className='section-area'>
            <div className="section-container">
                <div className="download-button">
                    <button>Download PDF</button>
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