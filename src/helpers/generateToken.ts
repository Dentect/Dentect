import jwt from 'jsonwebtoken';

export const generateToken = async (DentistId: string) => {
    const secret = process.env.ACCESS_TOKEN_SECRET || 'ACCESS TOKEN SECRET';
    const accessToken = jwt.sign({ dentistId: DentistId }, secret);
    
    return accessToken;
};
