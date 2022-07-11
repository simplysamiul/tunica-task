import React, { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import Preloader from '../custome/Preloader';


// Code spliting
const ViewStudentsPage = React.lazy(() => import('../pages/ViewStudentsPage'));
const AddStudentsPage = React.lazy(() => import('../pages/AddStudentsPage'));

const Body = () => {
    return (
        <Suspense fallback={<Preloader />}>
            <Routes>
                <Route path="/" element={<ViewStudentsPage />} />
                <Route path="/home" element={<ViewStudentsPage />} />
                <Route path="/viewstudents" element={<ViewStudentsPage />} />
                <Route path="/addstudents" element={<AddStudentsPage />} />
            </Routes>
        </Suspense>
    );
};

export default Body;