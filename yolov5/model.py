from detect import run
import os
from dotenv import load_dotenv

load_dotenv()

def detectDiseases(imgPath):
    weightsPath = os.getenv('ROOT') + '/best.pt'
    run(weights = weightsPath, source = imgPath, conf_thres = 0.1, imgsz = (416, 416))
    resultPath = os.getenv('ROOT') + '/yolov5/runs/detections' + '/' + str(imgPath).split(r'xrays/')[1]
    return {
        'detectionURL': resultPath,
        'report': 'xray.report'
    }
