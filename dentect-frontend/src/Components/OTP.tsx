import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OTP(props: any) {

    const [OTP, SetOTP] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function onSubmit(data: any) {
        setLoading(true);

        const baseURL = 'http://localhost:3000/auth/verifyAccount';

        try {
            const res = await axios.post(baseURL, { email: props.email, OTP });
            setLoading(false);
            
            sessionStorage.setItem('token', res.headers["auth-token"]);

            navigate("/MainFunctions", { replace: true })
        } catch (err: any) {
            setLoading(false);
            alert(err.response.data.error);
        };
    };
    async function resend(data: any) {
        setLoading(true);

        const baseURL = 'http://localhost:3000/auth/newOTP';

        try {
            await axios.post(baseURL, { email: props.email });
            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            alert(err.response.data.error);
        };
    };

    return (
        <div className="row justify-content-center">
            <div className='form-wrapper col-md-5 col-sm-9'>
                <h2>Mail verification</h2>

                <div className='data'>
                    <label htmlFor="OTP" className='dataStyle'>OTP</label>
                    <input className="inputData"
                        type='text'
                        onChange={(e) => SetOTP(e.target.value)}
                        value={OTP}
                        autoComplete="off"
                        required />
                </div>

                <div className='data submit'>
                    <button className="buttons m-4" onClick={resend}>Resend code</button>
                    <button className="buttons m-4" onClick={onSubmit}>Submit</button>
                </div>

                {loading ? <h2 className="loading">Loading...</h2> : ""}

            </div>
        </div>
    );
};

export default OTP;
