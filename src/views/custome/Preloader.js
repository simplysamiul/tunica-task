import { CircularProgress } from '@mui/material';
import React from 'react';

const Preloader = () => {
    return (
        <div style={{display:"flex", margin:"50px", alignItems:"center", justifyContent:"center"}}>
            <CircularProgress />
        </div>
    );
};

export default Preloader;