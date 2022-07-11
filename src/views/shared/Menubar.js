import { Link } from 'react-router-dom';
import menuLogo from '../../assets/logo.svg';
import '../../styles/Menubar.css';

const Menubar = () => {
    return (
        <div className="menu-area">
            <div className="menu-container">
                <div className="menu-content">
                    <div className="menu-logo">
                        <Link to="/"><img src={menuLogo} alt="" /></Link>
                    </div>
                    <div className="menu-items">
                        <Link to="/viewstudents">View-Students</Link>
                        <Link to="/addstudents">Add-Students</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menubar;