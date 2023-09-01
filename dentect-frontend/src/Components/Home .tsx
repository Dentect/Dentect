import { Link } from "react-router-dom";

export default function Home(props: any) {
    sessionStorage.removeItem('token');

    return (
        <div className="Home">
            <div className="homeBox">

                <h1>Dentect</h1>
                <h3>Dental Diseases Detection</h3>

                <Link to={'/Register'}>
                    <button className="buttons">Join Now</button>
                </Link>

            </div>
        </div>
    );
};
