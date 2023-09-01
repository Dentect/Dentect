import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Feedback(props: any) {

    const baseURL = `http://localhost:3000/dentists/feedback`;
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function onSubmit(data: any) {

        setLoading(true);

        const config = {
            headers: {
                authorization: sessionStorage.getItem('token')? `${sessionStorage.getItem('token')}` : '',
            },
        };

        try {
            await axios.post(baseURL, data, config);
            setLoading(false);
            navigate("/MainFunctions", { replace: true })
        } catch (err: any) {
            setLoading(false);
            alert(err.response.data.error);
        };
    };

    return (
        <div className='row form-wrapper'>
            <h2>Feedback</h2>

            <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <button
                            type="button"
                            key={index}
                            className={`stars ${index <= rating ? "on" : "off"}`}
                            onClick={() => setRating(index)}
                        >
                            <span className="stars">&#9733;</span>
                        </button>
                    );
                })}
            </div>

            <div className='data'>
                <label className='dataStyle'>Notes</label>
                <input className="inputData form-control" type='text' {...register("feedback", { required: true })} />
            </div>

            <div className="data submit">
                <button onClick={handleSubmit(onSubmit)} type="submit" className="buttons m-4">Save</button>
            </div>

            {loading ? <h2 className="loading">Loading...</h2> : ""}

        </div>
    );
};

export default Feedback;
