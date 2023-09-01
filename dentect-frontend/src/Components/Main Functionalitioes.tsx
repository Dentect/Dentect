import { Link } from "react-router-dom";

function MainFunctionalities() {

  return (

    <div>
      <div className="row upload mt-5">

        <Link to={'/PatientRegister'}>
          <button className="buttons m-5">Register patient</button>
        </Link>

        <Link to={'/ImageUpload'}>
          <button className="buttons m-5">Upload X-Ray</button>
        </Link>

        <Link to={'/ViewPatient'}>
          <button className="buttons m-5">View patient</button>
        </Link>

        <Link to={'/Feedback'}>
          <button className="buttons m-5">Feedback</button>
        </Link>

      </div>
    </div>
  );
};

export default MainFunctionalities;
