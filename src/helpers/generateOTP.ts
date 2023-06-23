// import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import OTPGenerator from 'otp-generator';

export const sendOTPEmail = async (dentist: any) => {
    const { OTP, OTPCreationTime, mail, transporter } = await generateOTP(dentist.email);
    
    dentist.OTP = OTP;
    dentist.OTPCreationTime = OTPCreationTime;

    await transporter.sendMail(mail);
    
    return dentist;
};

const generateOTP = async (userEmail: string) => {
    const transporter = await createTransporter();

    const OTP = OTPGenerator.generate(5, { upperCaseAlphabets: false, specialChars: false });
    const OTPCreationTime = Date.now();
    const mail = {
        from: `Dentect <${process.env.EMAIL}>`,
        to: userEmail,
        subject: 'Verify your new Dentect account',
        html: `<p style = "font-size:150%;">
                To verify your email address, please use the following One Time Password (OTP):</p>
                <b style = "font-size:200%;">${OTP}</b>
                <p style = "font-size:150%;">Do not share this OTP with anyone. Thank you!</p>`,
    };

    return {
        OTP,
        OTPCreationTime,
        mail,
        transporter,
    };
};


const createTransporter = async () => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    return transporter;
};
