import os
from dotenv import load_dotenv
from google.cloud import storage
from google.oauth2 import service_account

load_dotenv()

def upload_blob(bucket_name, source_file_name, destination_blob_name):
    credentials = service_account.Credentials.from_service_account_file(os.getenv('FIREBASE_CREDENTIALS'))
    storage_client = storage.Client(credentials = credentials)
    bucket = storage_client.bucket(bucket_name)
    destination_blob_name += str(source_file_name).split(r'detections/')[1]
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_filename(source_file_name)
    blob.make_public()
    return blob.public_url
