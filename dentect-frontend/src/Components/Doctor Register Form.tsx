import { useForm } from 'react-hook-form';
import axios from "axios";
import { useNavigate } from "react-router-dom";

import registerImage from '../assets/Register.png';
import { useState } from 'react';

function DoctorRegister(props: any) {

    const baseURL = "http://localhost:3000/auth/signUp";
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    async function onSubmit(data: any) {
        setLoading(true);

        try {
            await axios.post(baseURL, data);
            setLoading(false);
            props.setEmail(data.email);
            navigate("/MailVerification", { replace: true });
        } catch (err: any) {
            setLoading(false);
            alert(err.response.data.error);
        };
    };

    return (
        <div className="row justify-content-center">

            <div className="col-md-5 my-auto col-sm-9">
                <img className="w-100" src={registerImage} alt=''></img>
            </div>

            <div className='form-wrapper col-md-5 col-sm-9'>
                <h2>Sign Up</h2>

                <form>
                    <div className='data'>
                        <label className='dataStyle' htmlFor="firstName">First Name</label>
                        <input className="inputData" type='text' {...register("firstName", { required: true })} />
                    </div>

                    <div className='data'>
                        <label className='dataStyle' htmlFor="lastName">Last Name</label>
                        <input className="inputData" type='text' {...register("lastName", { required: true })} />
                    </div>

                    <div className='data'>
                        <label htmlFor="email" className='dataStyle'>Email</label>
                        <input className="inputData" type='email'{...register("email", { required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })} />
                    </div>

                    <div className='data'>
                        <label htmlFor="password" className='dataStyle'>Password</label>
                        <input className="inputData" type='password'{...register("password", { required: true, minLength: 6 })} />
                    </div>

                    <div className='data'>
                        <label htmlFor="medicalId" className='dataStyle'>Medical ID</label>
                        <input className="inputData" type='text' {...register("medicalId", { required: true })} />
                    </div>

                    <div className='data'>
                        <label htmlFor="yearsOfExperience" className='dataStyle'>Years Of Experience</label>
                        <input className="inputData" type='text' {...register("yearsOfExperience", { required: true, valueAsNumber: true })} />
                    </div>

                    <div className='data'>
                        <label htmlFor="clinicPhone" className='dataStyle'>Clinic Phone</label>
                        <input className="inputData" type='text' {...register("clinicPhone")} />
                    </div>

                    <div className='data'>
                        <label htmlFor="clinicAddress" className='dataStyle'>Clinic Address</label>
                        <input className="inputData" type='text' {...register("clinicAddress")} />
                    </div>

                    <div className='data submit'>
                        <button type="submit" className="buttons" onClick={handleSubmit(onSubmit)}>Register Me</button>
                    </div>
                </form>
            </div>
            
            {loading ? <h2 className="loading">Loading...</h2> : ""}

        </div>
    );
};

export default DoctorRegister;
