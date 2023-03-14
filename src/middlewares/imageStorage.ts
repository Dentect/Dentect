import express from 'express';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import multer from 'multer';
import path from 'path';
import storage from '../config/firebaseConfig';

export const upload = multer({ storage: multer.memoryStorage() });

export const uploadImage = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.file === undefined) {
        res.status(400).json('X-ray not found.');
        return;
    }

    const storageReference = ref(
        storage,
        `xrays/${path.parse(req.file.originalname).name}-${Date.now()}${path.parse(req.file.originalname).ext}`
    );
    const snapshot = await uploadBytesResumable(storageReference, req.file.buffer, { contentType: req.file.mimetype });

    req.body.originalURL = await getDownloadURL(snapshot.ref);
    next();
};
