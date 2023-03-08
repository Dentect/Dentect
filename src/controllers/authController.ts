import express from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import Dentist from '../models/dentist';


export const signUp = asyncHandler(async (req: express.Request, res: express.Response) => {
    let newDentist = req.body;
    newDentist.password = await bcrypt.hash(req.body.password, 10);
    newDentist = await Dentist.create(newDentist);
    res.status(201).json(newDentist);
    return;
});

export const signIn = asyncHandler (async (req: express.Request, res: express.Response) => {
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

    res.json(dentistFound);
    return;
});
