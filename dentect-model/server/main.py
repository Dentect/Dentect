import random
import string
import sys
from flask import Flask, request
import firebase_admin
from firebase_admin import credentials, storage
from google.cloud import storage as st
from google.oauth2 import service_account
import urllib
import requests
import os
from pathlib import Path
from dotenv import load_dotenv

from imageUpload import upload_blob

sys.path.insert(1, os.getenv('ROOT') + '/yolov5') # Ubuntu
# sys.path.insert(1, os.getenv('ROOT') + '\yolov5') # Windows
from model import detectDiseases

app = Flask(__name__)
load_dotenv()

credential = credentials.Certificate(os.getenv('FIREBASE_CREDENTIALS'))
firebase_admin.initialize_app(credential, { 'storageBucket': os.getenv('BUCKET_URL') })

@app.route('/detect', methods = ['POST'])
def controller():
    
    xrayURL = request.get_json()["xrayURL"]
    xrayName = os.path.join(os.getenv('ROOT') , 'yolov5','runs', 'xrays', \
                (os.path.basename(Path(xrayURL)).split('?')[0].split('F')[1].split('-')[0] + '-')) \
                + ''.join(random.choices(string.ascii_letters, k=10)) + '.jpg'

    urllib.request.urlretrieve(xrayURL, xrayName)
    detection = detectDiseases(xrayName)

    detectionURL = upload_blob(firebase_admin.storage.bucket().name, detection['detectionURL'], 'detections/')

    if os.path.exists(xrayName):
        os.remove(xrayName)
    if os.path.exists(detection['detectionURL']):
        os.remove(detection['detectionURL'])

    return {
        'detectionURL': detectionURL,
        'report': 'xray.report'
    }
