import { useForm } from 'react-hook-form';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import registerImage from '../assets/Register patient data.png';

function PatientRegister(props: any) {

    console.log(sessionStorage.getItem('token'))

    const baseURL = "http://localhost:3000/dentists/patients";
    let navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    async function onSubmit(data: any) {

        const config = {
            headers: {
                authorization: sessionStorage.getItem('token')? `${sessionStorage.getItem('token')}` : '',
            },
        };

        try {
            await axios.post(baseURL, data, config);
            navigate("/ImageUpload", { replace: true });
        } catch (err: any) {
            alert(err.response.data.error);
        };
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-5 my-auto col-sm-9">
                <img className="w-100" src={registerImage} alt=''></img>
            </div>

            <div className='form-wrapper col-md-5 col-sm-9'>
                <h2>Patient data</h2>

                <form>
                    <div className='data'>
                        <label htmlFor="firstName" className='dataStyle'>First Name</label>
                        <input className="inputData" type='text'  {...register("firstName", { required: true })} />
                        <label htmlFor="middleName" className='dataStyle'>Middle Name</label>
                        <input className="inputData" type='text'  {...register("middleName", { required: true })} />
                        <label htmlFor="lastName" className='dataStyle'>Last Name</label>
                        <input className="inputData" type='text'  {...register("lastName", { required: true })} />
                    </div>

                    <div className='data'>
                        <label htmlFor="email" className='dataStyle'>Email</label>
                        <input className="inputData" type='email' {...register("email", { pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })} />
                    </div>

                    <div className='data'>
                        <label htmlFor="medicalHistory" className='dataStyle'>Medical History</label>
                        <input className="inputData" type='text' {...register("medicalHistory")} />
                    </div>

                    <div className='data'>
                        <label htmlFor="gender" className='dataStyle'>Gender</label>
                        <p className='gender'>
                            <input type='radio' value="Female"  {...register("gender", { required: true })} />
                            Female
                        </p>
                        <p className='gender'>
                            <input type='radio' value="Male" {...register("gender", { required: true })} />
                            Male
                        </p>
                    </div>

                    <div className='data'>
                        <label htmlFor="phone" className='dataStyle'>Phone</label>
                        <input className="inputData" type='text' {...register("phone", { required: true })} />
                    </div>

                    <div className='data'>
                        <label htmlFor="clinicId" className='dataStyle'>ID</label>
                        <input className="inputData" type='text' {...register("clinicId", { required: true, valueAsNumber: true })} />
                    </div>

                    <div className='data'>
                        <label htmlFor="birthDate" className='dataStyle'>Birth Date</label>
                        <input className="inputData" type='date' {...register("birthDate", { required: true })} />
                    </div>

                    <div className='data'>
                        <label htmlFor="dentalHistory" className='dataStyle'>Dental History</label>
                        <input className="inputData" type='text' {...register("dentalHistory")} />
                    </div>

                    <div className='data submit'>
                        <Link onClick={handleSubmit(onSubmit)} to={'/ImageUpload'}>
                            <button type="submit" className="buttons">Register Patient</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PatientRegister;
