import express from 'express';
import asyncHandler from 'express-async-handler';
import _ from 'lodash';
import Dentist from '../models/dentist';
import Patient from '../models/patient';

const generateUserName = (...names: string[]) => {
    const userName = names.join(' ');
    return userName;
};

export const addPatient = asyncHandler(async (req: express.Request, res: express.Response) => {
    const { dentistId } = req.params;
    let patient = req.body;

    patient.userName = generateUserName(patient.firstName, patient.middleName, patient.lastName);
    patient = await Patient.create(patient);
    const dentist = await Dentist.findOne({ _id: dentistId });
    dentist.patients.push({ patientId: patient._id, patientName: patient.userName });
    await dentist.save();

    res.json(patient);
    return;
});

export const getPatient = asyncHandler(async (req: express.Request, res: express.Response) => {
    const { dentistId, patientName } = req.params;

    const dentist = await Dentist.findById(dentistId);
    const found = _.find(dentist.patients, (patient) => patient.patientName === patientName);
    if (!found) {
        res.status(401).json('Wrong patient name.');
        return;
    }
    const patient = await Patient.findOne({ userName: patientName });
    res.json(patient);
    return;
});

export const editPatient = asyncHandler(async (req: express.Request, res: express.Response) => {
    const { dentistId, patientName } = req.params;

    const dentist = await Dentist.findById(dentistId);
    const patientIndex = _.findIndex(dentist.patients,
        (patient: { patientName: string; }) => patient.patientName === patientName);

    if (patientIndex === -1) {
        res.status(401).json('Wrong patient name.');
        return;
    }

    const patient = await Patient.findOne({ userName: patientName });
    const updates = req.body;
    const updatedPatient = {
        ...patient.toObject(),
        ...updates,
    };
    updatedPatient.userName = generateUserName(
        updatedPatient.firstName,
        updatedPatient.middleName,
        updatedPatient.lastName,
    );
    await Patient.updateOne({ _id: patient._id }, updatedPatient);
    dentist.patients[patientIndex].patientName = updatedPatient.userName;
    await dentist.save();

    res.json(updatedPatient);
    return;
});
