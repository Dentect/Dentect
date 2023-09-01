import { useLocation } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';

import teeth from '../assets/image9.png';

export default function NavBar() {

    useLocation();

    // Login & register &About us
    const case1 = {
        link1: {
            text: 'Home',
            target: '/',
        },
        link2: {
            text: 'About Us',
            target: '/AboutUs',
        },
    };

    // Home page
    const case2 = {
        link1: {
            text: 'Login',
            target: '/Login',
        },
        link2: {
            text: 'About Us',
            target: '/AboutUs',
        },
    };

    // Main Functions
    const case3 = {
        link1: {
            text: 'About Us',
            target: '/AboutUs',
        },
        link2: {
            text: 'Logout',
            target: '/',
        },
    };

    // Any page
    const case4 = {
        link1: {
            text: 'Home',
            target: '/MainFunctions',
        },
        link2: {
            text: 'Logout',
            target: '/',
        },
    };


    const changeTitle = () => {
        switch (window.location.pathname) {
            case '/Register':
                return {
                    title: 'Register',
                    ...case1,
                };

            case '/Login':
                return {
                    title: 'LogIn',
                    ...case1,
                };

            case '/MainFunctions':
                return {
                    title: 'Main functionality',
                    ...case3,
                };

            case '/ImageUpload':
                return {
                    title: 'Upload X-ray',
                    ...case4,
                };

            case '/DisplayDetection':
                return {
                    title: 'Display detection & report',
                    ...case4,
                };

            case '/PatientRegister':
                return {
                    title: 'Register patient',
                    ...case4,
                };

            case '/ViewPatient':
                return {
                    title: 'View patient data',
                    ...case4,
                };

            case '/AboutUs':
                return {
                    title: 'About Us',
                    ...case1,
                };

            case '/Feedback':
                return {
                    title: 'Feedback',
                    ...case4,
                };

            case '/MailVerification':
                return {
                    title: 'Mail Verification',
                    ...case1,
                };

            case '/ViewOldXrays':
                return {
                    title: 'View Old X-rays',
                    ...case4,
                };

            default:
                return {
                    title: 'Dentect',
                    ...case2,
                };
        };
    };

    const navBar = changeTitle();

    return (
        <Navbar>

            <Navbar.Brand className="mx-5" href="/"><img src={teeth} alt="" width="100" height="100" /></Navbar.Brand>
            <h2>{navBar?.title}</h2>

            <Nav className="ms-auto">
                <button className='navButtons mx-3'>
                    <Nav.Link href={navBar?.link1.target}>{navBar?.link1.text}</Nav.Link>
                </button>

                <button className='navButtons mx-3'>
                    <Nav.Link href={navBar?.link2.target}>{navBar?.link2.text}</Nav.Link>
                </button>
            </Nav>

        </Navbar>
    );
};
