from detect import run
import os
from dotenv import load_dotenv

load_dotenv()

def detectDiseases(imgPath):
    weightsPath = os.path.join(os.getenv('ROOT'),  'best.pt')
    run(weights = weightsPath, source = imgPath, conf_thres = 0.35, imgsz = (640,1280), iou_thres = 0.45)
    resultPath = os.path.join(os.getenv('ROOT') , 'yolov5', 'runs', 'detections', str(imgPath).split('xrays/')[1]) # Ubuntu
    # resultPath = os.path.join(os.getenv('ROOT') , 'yolov5', 'runs', 'detections', str(imgPath).split('xrays\\')[1]) # Windows
    return {
        'detectionURL': resultPath,
    }
