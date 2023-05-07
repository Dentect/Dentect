from detect import run
import os
from dotenv import load_dotenv

load_dotenv()

def detectDiseases(imgPath):
    weightsPath = os.path.join(os.getenv('ROOT'),  'best.pt')
    run(weights = weightsPath, source = imgPath, conf_thres = 0.1, imgsz = (416, 416))
    resultPath = os.path.join(os.getenv('ROOT') , 'yolov5', 'runs', 'detections', str(imgPath).split('xrays/')[1]) # Ubuntu
    # resultPath = os.path.join(os.getenv('ROOT') , 'yolov5', 'runs', 'detections', str(imgPath).split('xrays\\')[1]) # Windows
    return {
        'detectionURL': resultPath,
        'report': 'xray.report'
    }
