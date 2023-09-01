import axios from "axios";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import Popup from 'reactjs-popup';

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
function DisplayDetection(props: any) {


  const baseURL = `http://localhost:3000/patients/xrays/${props.xray?._id}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: any) {

    setLoading(true);

    const config = {
      headers: {
        authorization: sessionStorage.getItem('token') ? `${sessionStorage.getItem('token')}` : '',
      },
    };

    try {
      await axios.post(baseURL, data, config);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      alert(err.response.data.error);
    };
  };


  return (

    <div className="row justify-content-center">

      <div className="upload my-5">

        <TransformWrapper> 
          <TransformComponent >
            <img  className="images m-5" src={props.xray?.detectionURL} alt="" />
          </TransformComponent>
        </TransformWrapper>

        <Popup trigger=
          {<button className="buttons m-4">Diseases Names</button>}
        >
          <div >
            CP: Caries Proximal<br />
            CO: Caries Occlusal<br />
            PBLID: Periodontal Bone Loss Inter Dental<br />
            PBLIR: Periodontal Bone Loss Inter Radicular<br />
            PL: Periapical Lesion<br />
            I: Impaction <br />
          </div>
        </Popup>
      </div>

      <div className="form-wrapper col-md-5 col-sm-9">
        <label htmlFor="dentistComment" className='dataStyle'>Comments</label><br />
        <input className="inputData form-control" type='text' {...register("dentistComment", { required: true })} /><br />

        <div className="data submit">
          <button onClick={handleSubmit(onSubmit)} type="submit" className="buttons m-4">Save</button>
        </div>

        {loading ? <h2 className="loading">Loading...</h2> : ""}

      </div>
    </div>
  );
};

export default DisplayDetection;
