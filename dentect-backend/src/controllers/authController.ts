import express from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

import Dentist from '../models/dentist';
import { registerValidation, logInValidation } from '../middlewares/validateData';
import { generateUserName } from '../helpers/generateUserName';
import { sendOTPEmail } from '../helpers/generateOTP';
import { generateToken } from '../helpers/generateToken';

export const signUp = asyncHandler(async (req: express.Request, res: express.Response) => {
    let newDentist = req.body;

    const error = registerValidation(newDentist);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }

    const userExists = await Dentist.findOne({ email: newDentist.email });
    if (userExists) {
        res.status(400).json({ error: 'Email already exists!' });
        return;
    }

    newDentist.userName = generateUserName(newDentist.firstName, newDentist.lastName);
    newDentist.password = await bcrypt.hash(newDentist.password, 10);

    newDentist.isVerified = false;
    newDentist = await sendOTPEmail(newDentist);

    newDentist = await Dentist.create(newDentist);
    res.sendStatus(201);
    return;
});

export const signIn = asyncHandler(async (req: express.Request, res: express.Response) => {
    const error = logInValidation(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }

    const foundDentist = await Dentist.findOne({ email: req.body.email });

    if (!foundDentist) {
        res.status(401).json({ error: 'Wrong email!' });
        return;
    }

    const validPassword = await bcrypt.compare(req.body.password, foundDentist.password);
    if (!validPassword) {
        res.status(401).json({ error: 'Wrong password!' });
        return;
    }

    if (!foundDentist.isVerified) {
        res.status(401).json({ error: 'Unverified account!' });
        return;
    }

    const accessToken = await generateToken(foundDentist._id);
    res.header('auth-token', `Bearer ${accessToken}`).json(foundDentist);
    return;
});

export const verifyAccount = asyncHandler(async (req, res) => {
    const { email, OTP } = req.body;
    const foundDentist = await Dentist.findOne({ email: email });

    if (!foundDentist) {
        res.status(401).json({ error: 'Wrong email!' });
        return;
    }

    const currentDate = new Date();
    const OTPCreationTime = new Date(foundDentist.OTPCreationTime);

    if (OTP === null || OTP !== foundDentist.OTP) {
        res.status(401).json({ error: 'Invalid code!' });
        return;
    }
    if (currentDate.getTime() > (OTPCreationTime.getTime() + 5 * 60000)) {
        res.status(401).json({ error: 'Expired code!' });
        return;
    }

    // foundDentist.isVerified = true;
    await Dentist.updateOne(
        { email: foundDentist.email },
        { $unset: { OTP: '', OTPCreationTime: '', isVerified: true } },
    );

    await Dentist.updateOne(
        { email: foundDentist.email },
        { $set: { isVerified: true } },
    );
    
    const accessToken = await generateToken(foundDentist._id);
    res.header('auth-token', `Bearer ${accessToken}`).json(foundDentist);
    return;
});

export const generateNewOTP = asyncHandler(async (req, res) => {
    const { email } = req.body;
    let foundDentist = await Dentist.findOne({ email: email });

    if (!foundDentist) {
        res.status(401).json({ error: 'Wrong email!' });
        return;
    }

    foundDentist = await sendOTPEmail(foundDentist);
    await foundDentist.save();

    res.sendStatus(201);
    return;
});
