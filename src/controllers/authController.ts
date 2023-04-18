import express from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Dentist from '../models/dentist';
import { registerValidation, logInValidation } from '../middlewares/validateData';
import { generateUserName } from '../helpers/generateUserName';


export const signUp = asyncHandler(async (req: express.Request, res: express.Response) => {
    let newDentist = req.body;

    const error = registerValidation(newDentist);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }

    const userExists = await Dentist.findOne({ email: newDentist.email });
    if (userExists) {
        res.status(400).json({ error: 'Email already exists.' });
        return;
    }

    newDentist.userName = generateUserName(newDentist.firstName, newDentist.lastName);
    newDentist.password = await bcrypt.hash(newDentist.password, 10);
    newDentist = await Dentist.create(newDentist);
    res.status(201).json(newDentist);
    return;
});

export const signIn = asyncHandler(async (req: express.Request, res: express.Response) => {
    const error = logInValidation(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }

    const dentistFound = await Dentist.findOne({ email: req.body.email });

    if (!dentistFound) {
        res.status(401).json({ error: 'Wrong email.' });
        return;
    }

    const validPassword = await bcrypt.compare(req.body.password, dentistFound.password);
    if (!validPassword) {
        res.status(401).json({ error: 'Wrong password.' });
        return;
    }

    const secret = process.env.ACCESS_TOKEN_SECRET || 'ACCESS TOKEN SECRET';
    const accessToken = jwt.sign({ dentistId: dentistFound._id }, secret);
    res.header('auth-token', accessToken).send('Signed In.');
    return;
});
