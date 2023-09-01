import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function ImageUpload(props: any) {

  const [image, setImages] = useState('');
  const [uploadedImage, setUploadedImages] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit
  } = useForm();

  const handleChange = (e: any) => {
    const blob = new Blob([e.target.files[0]], { type: '*/*' });
    const imageUrl = URL.createObjectURL(blob);
    setUploadedImages(imageUrl);
    setImages(e.target.files[0]);
  };

  async function handleApi(data: any) {
    setLoading(true);

    const baseURL = `http://localhost:3000/patients/${data.clinicId}/xrays`;
    const config = {
      headers: {
        authorization: sessionStorage.getItem('token')? `${sessionStorage.getItem('token')}` : '',
      },
    };

    const formData = new FormData();
    formData.append('xray', image);
    formData.append('xrayDate', data.xrayDate);

    try {
      const res = await axios.post(baseURL, formData, config);
      setLoading(false);
      const xRay = res.data.xray;
      props.setDetectedImage(xRay);
      navigate("/DisplayDetection", { replace: true });
    } catch (err: any) {
      setLoading(false);
      alert(err.response.data.error);
    };
  };

  return (

    <div>
      <div className="upload">

        <div className='m-5'>
          <label htmlFor="Id" className='dataStyle'>ID</label>
          <input className="inputData m-5" type='text' {...register("clinicId", { required: true })} />
          <label htmlFor="date" className='dataStyle'>X-Ray Date</label>
          <input className="inputData m-5" type='date' {...register("xrayDate", { required: true })} />
        </div>

        <div>
          <div>
            <img className="images" src={uploadedImage} alt="" />
          </div>
        </div>

        <label className="buttons m-4 p-4">
          <input type="file" onChange={handleChange} />
          Upload X-ray
        </label>

        <button className="buttons m-4" onClick={handleSubmit(handleApi)}>Detect</button>

      </div>

      {loading ? <h2 className="loading">Loading...</h2> : ""}

    </div>
  );
};

export default ImageUpload;
