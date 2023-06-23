import joi from 'joi';

export const registerValidation = (data: unknown) => {
    const schema = joi.object({
        firstName: joi.string().min(2).max(20).required(),
        lastName: joi.string().min(2).max(20).required(),
        email: joi.string().min(10).max(30).email().required(),
        password: joi.string().min(6).max(50).required(),
        medicalId: joi.string().required(),
        yearsOfExperience: joi.number(),
        clinicAddress: joi.string(),
        clinicPhone: joi.string(),
    });

    return schema.validate(data).error;
};

export const logInValidation = (data: unknown) => {
    const schema = joi.object({
        email: joi.string().min(10).max(30).email().required(),
        password: joi.string().min(6).max(50).required(),
    });

    return schema.validate(data).error;
};

export const patientValidation = (data: unknown) => {
    const schema = joi.object({
        firstName: joi.string().min(2).max(20).required(),
        middleName: joi.string().min(2).max(20).required(),
        lastName: joi.string().min(2).max(20).required(),
        clinicId: joi.number().required(),
        gender: joi.string().required(),
        birthDate: joi.date().required(),
        email: joi.string().min(10).max(30).email(),
        phone: joi.string(),
        medicalHistory: joi.string(),
        dentalHistory: joi.string(),
    });

    return schema.validate(data).error;
};

export const feedbackValidation = (data: unknown) => {
    const schema = joi.object({
        feedback: joi.string().required(),
    });

    return schema.validate(data).error;
};
