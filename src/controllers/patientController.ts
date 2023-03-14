import express from 'express';
import asyncHandler from 'express-async-handler';
import axios from 'axios';
import _ from 'lodash';
import Xray from '../models/x-ray';
import Patient from '../models/patient';

require('dotenv').config();

export const addPatientXray = asyncHandler(async (req: express.Request, res: express.Response) => {
    const { patientId } = req.params;
    
    const patient = await Patient.findById(patientId);
    let xray = req.body;
    xray.originalURL = req.body.originalURL;
    xray = await Xray.create(xray);
    patient.xRays.push(xray._id);
    await patient.save();

    const MODELURL = process.env.MODELURL || 'http://127.0.0.1:5000/detect';
    const response = await axios.post(MODELURL, { xrayURL: xray.originalURL });
    xray.detectionURL = response.data.detectionURL;
    xray.report = response.data.report;
    xray.save();

    res.json({ patient, xray });
    return;
});

// not finished
export const getPatientXrays = asyncHandler(async (req: express.Request, res: express.Response) => {
    const { patientId } = req.params;
    const patient = await Patient.findById(patientId);

    const xrays: unknown[] = [];
    _.forEach(patient.xRays, async (xray) => {
        xray = await Xray.findById(xray.xrayId);
        xrays.push(xray);
    });

    res.json(xrays);
    return;
});
