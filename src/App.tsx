import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ImageUpload from './Components/Upload x-ray';
import DisplayDection from './Components/Display Detection';
import NavBar from './Components/NavBar';
import DoctorRegister from './Components/Doctor Register Form';
import PatientRegister from './Components/Add Patient Form';
import DoctorLogin from './Components/Doctor Login Form';
import Home from './Components/Home ';
import MainFunctionalities from './Components/Main Functionalitioes';
import ViewPatient from './Components/Veiw Patient';
import AboutUs from './Components/AboutUs';
import Feedback from './Components/Feedback';
import useToken from './Components/UseToken';
import OTP from './Components/OTP';
import ViewXrays from './Components/Old X-Rays';


function App() {

  const [token, setToken] = useState(null);
  const [clinicId, setClinicId] = useState(null);
  const [uploadedImage, setUploadedImages] = useState(null);
  const [email, setEmail] = useState(null);
  const [xrays, setXrays] = useState(null);




  const handleLogin = (newToken: any) => {
    setToken(newToken);
  };

  const patientId = (newId: any) => {
    setClinicId(newId);
  };

  const detectedImage = (newImage: any) => {
    setUploadedImages(newImage);
  };

  const handleRegister = (newEmail: any) => {
    setEmail(newEmail)
  }

  const oldXrays = (newXrays: any) => {
    setXrays(newXrays)
  }

  return (
    <>
      <BrowserRouter>
        <NavBar />

        <Routes>
          
          <Route path="/Register" element={<DoctorRegister setEmail = {handleRegister}/>} />
          <Route path='' element={<Home />} />
          <Route path="/Login" element={<DoctorLogin onLogin = {handleLogin}/>} />
          <Route path="/MainFunctions" element={<MainFunctionalities token = {token}/>} />
          <Route path="/ImageUpload" element={<ImageUpload setDetectedImage = {detectedImage} id = {clinicId} token = {token}/>} />
          <Route path="/DisplayDection" element={<DisplayDection image = {uploadedImage} id = {clinicId}/>} />
          <Route path="/PatientRegister" element={<PatientRegister token = {token}/>} />
          <Route path="/ViewPatient" element={<ViewPatient  setId = {patientId} token = {token} setXrays = {oldXrays}/>} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Feedback" element={<Feedback />} />
          <Route path="/MailVerification" element={<OTP email = {email}/>} />
          <Route path="/ViewOldXrays" element={<ViewXrays xrays = {xrays}/>} />
          
        </Routes>

      </BrowserRouter>



    </>
  );

}

export default App;
