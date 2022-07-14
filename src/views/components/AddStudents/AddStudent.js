import React, { useState } from 'react';
import { Alert } from '@mui/material';
import { useForm } from "react-hook-form";
import formLogo from '../../../assets/logo1.svg';
import '../../../styles/AddStudents.css';
import Preloader from '../../custome/Preloader';

const AddStudent = () => {
    const [loading, setLoading] = useState(false);
    const [addSuccessfully, setAddSuccessfully] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        setLoading(true);
        fetch("https://ronchon-chocolatine-52670.herokuapp.com/addstudents", {
            method: "POST",
            headers:{
                "content-type" : "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            setLoading(false);
            setAddSuccessfully(true);
            reset();
        })
    };
    return (
            <div className="section-container">
                <div className="form-area">
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
                            {loading && <Preloader />}
                            <button type='submit'>Submit</button>
                            <div className="notification">
                            {addSuccessfully && <Alert severity="success">Student Add Successfully !!</Alert>}
                            </div>
                        </form>
                </div>
            </div>
    );
};

export default AddStudent;