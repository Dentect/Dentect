import { Link } from "react-router-dom";


export default function Home(props: any) {
    return (
        <div className="Home">
            <div className="homeBox">
                <h1>Dental Disease Detection</h1>

                <Link to={'/Register'}>
                    <button className="buttons">Join Now</button>
                </Link>

            </div>
        </div>
    );
}