export const calculateAge = (birthDate: Date) => {
    const differenceMilliSeconds = Date.now() - new Date(birthDate).getTime();
    const ageDate = new Date(differenceMilliSeconds);

    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
};
