import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import registerImage from '../assets/Login.png';

function DoctorLogin(props: any) {

    const baseURL = "http://localhost:3000/auth/signIn";
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function onSubmit(data: any) {

        data.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(baseURL, { email, password });
            setLoading(false);

            sessionStorage.setItem('token', res.headers["auth-token"]);
            
            navigate("/MainFunctions", { replace: true });
        } catch (err: any) {
            setLoading(false);
            alert(err.response.data.error);
            if (err.response.data.error === 'Unverified account!') {
                console.log(err.response.data.error === 'Unverified account!')
                props.setEmail(email);
                navigate("/MailVerification", { replace: true });
            }
        };
    };

    return (
        <div className="row justify-content-center">

            <div className="col-md-5 my-auto col-sm-9">
                <img className="w-100" src={registerImage} alt=""></img>
            </div>

            <div className='form-wrapper col-md-5 col-sm-9'>
                <h2>Login</h2>

                <form>

                    <div className='data'>
                        <label htmlFor="email" className='dataStyle'>Email</label>
                        <input className="inputData"
                            type='email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            autoComplete="off"
                            required />
                    </div>

                    <div className='data'>
                        <label htmlFor="password" className='dataStyle'>Password</label>
                        <input className="inputData"
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required />
                    </div>

                    <div className='data submit'>
                        <Link onClick={onSubmit} to={'/MainFunctions'}>
                            <button type="submit" className="buttons">Login</button>
                        </Link>
                    </div>

                    {loading ? <h2 className="loading">Loading...</h2> : ""}

                </form>
            </div>

        </div>
    );
};

export default DoctorLogin;
