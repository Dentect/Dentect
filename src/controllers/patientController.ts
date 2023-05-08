import express from 'express';
import asyncHandler from 'express-async-handler';
import axios from 'axios';

import Xray from '../models/x-ray';
import Patient from '../models/patient';

require('dotenv').config();

export const addPatientXray = asyncHandler(async (req: express.Request, res: express.Response) => {
    const { patientClinicId } = req.params;

    const patient = await Patient.findOne({ clinicId: Number(patientClinicId) });
    if (!patient) {
        res.status(401).json('Wrong patient clinic id.');
        return;
    }

    let xray = req.body;
    xray.originalURL = req.body.originalURL;
    xray = await Xray.create(xray);
    patient.xRays.push(xray._id);
    await patient.save();

    const MODELURL = process.env.MODELURL || 'http://127.0.0.1:5000/detect';
    const response = await axios.post(MODELURL, { xrayURL: xray.originalURL });
    xray.detectionURL = response.data.detectionURL;
    xray.save();

    res.json({ xray });
    return;
});

export const getPatientXrays = asyncHandler(async (req: express.Request, res: express.Response) => {
    const { patientClinicId } = req.params;

    const patient = await Patient.findOne({ clinicId: Number(patientClinicId) });
    if (!patient) {
        res.status(401).json('Wrong patient clinic id.');
        return;
    }

    const xrays: unknown[] = [];
    await Promise.all(
        patient.xRays.map(async (xray: any) => {
            xray = await Xray.findById(xray._id);
            xrays.push(xray);
        })
    );

    res.json(xrays);
    return;
});

export const addDetectionComment = asyncHandler(async (req: express.Request, res: express.Response) => {
    const { xrayId } = req.params;
    const { dentistComment } = req.body;

    const xray = await Xray.findById(xrayId);
    if (!xray) {
        res.status(401).json('Wrong x-ray id.');
        return;
    }
    xray.dentistComment = dentistComment;
    xray.save();

    res.json(xray);
    return;
});
