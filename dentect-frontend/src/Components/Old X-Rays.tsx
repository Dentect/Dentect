import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function ViewXrays(props: any) {

  var images = (props.xrays).map(function (image: any) {
    return (

      <div className="upload my-5">
        <h1>Original X-ray</h1>
        <TransformWrapper> 
          <TransformComponent >
          <img className="images m-5" src={image.originalURL} alt="" />
          </TransformComponent>
        </TransformWrapper>


        <h1>Detected X-ray</h1>
        <TransformWrapper> 
          <TransformComponent >
          <img className="images m-5" src={image.detectionURL} alt="" />
          </TransformComponent>
        </TransformWrapper>

      </div>
    );
  });

  return (
    <div className="col ">
      {images}
    </div>
  );
};

export default ViewXrays;
