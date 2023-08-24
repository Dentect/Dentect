# Dentect for Dental Diseases Detection - BE
An application dentists can use to diagnose specific abnormalities in less time and with better accuracy using panoramic dental radiography.
<br/><br/>

## Used Technologies
* [NodeJS](https://nodejs.org/)
* [ExpressJS](https://www.expresjs.org/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose ODM](https://mongoosejs.com/) 
* [Firebase](https://firebase.google.com/)
* [JSON Web Token](https://jwt.io/)
* [Nodemailer](https://nodemailer.com/)
* [Bcrypt.js](https://www.npmjs.com/package/bcrypt)
* [Multer](https://www.npmjs.com/package/multer)
* [joi](https://joi.dev/)
<br/><br/>

## Running the server
1. To run the server, the first step is downloading and installing [NodeJS](https://nodejs.org/en/download) on your machine. <br/>

2. Open a terminal, navigate to the project's directory, and run the following command to install the needed packages:
```js
npm i
```

3. Create a `.env` file in the project's root directory and fill in the data according to the [.env.example](https://github.com/Dentect/dental-diseases-detection-backend/blob/main/.env.example) file.

4. Now, run the server through:
```js
npm start run:dev
```
<br/><br/>

## API Endpoints
| HTTP Method | Endpoint | Required fields | Optional fields | Action | Response |
| :---------- | :------- | :-------------- | :-------------- | :----- | :------- |
| POST   | /auth/signUp | - firstName: string <br/> - lastName: string <br/> - email: string <br/> - password: string <br/> - medicalId: string | - yearsOfExperience: number <br/> - clinicAddress: string <br/> - clinicPhone: string | SignUp | - 'Created' message |
| POST   | /auth/signIp | - email: string <br/> - password: string | None | SignIn | - The `dentistFound` object <br/> - jwt access token in auth-token header |
| POST   | /auth/verifyAccount | - email: string <br/> - OTP: string | None | Verify Account | - 'OK' message |
| POST   | /auth/newOTP | - email: string | None | Generate New OTP | - 'Created' message |

> **Note: The following endpoints require an access token (bearer token)**

| HTTP Method | Endpoint | Required fields | Optional fields | Action | Response |
| :---------- | :------- | :-------------- | :-------------- | :----- | :------- |
| POST   | /dentists/patients | firstName: string <br/> middleName: string <br/> lastName: string <br/> clinicId: number <br/> gender: string <br/> birthDate: date '2000-06-17' | email: string <br/> phone: string <br/> medicalHistory: string <br/> dentalHistory: string | Add Patient | - The created `patient` object |
| GET    | /dentists/patients/:patientClinicId | None | None | Get Patient |
| Patch  | /dentists/patients/:patientClinicId | None | All fields could be edited | Edit Patient | - The `updatedPatient` object |
| POST   | /patients/:patientClinicId/xrays | xray: image <br/> birthDate: date '2000-06-17' <br/> note: both are attached as form-data | None | Add Patient Xray (Detect) | - The created `xray` object |
| GET    | /patients/:patientClinicId/xrays | None | None | Get Patient Xrays | - Array of `xrays` objects |
| POST   | /patients/xrays/:xrayId` | dentistComment: string | None | Comment on Detection | - `xray` object |

<br/><br/>

## Returned objects format
> **Note: optional fields could be null**

```js
dentist = {
	firstName,
	lastName,
	userName,
	email,
	password,
	yearsOfExperience,
	medicalId,
	clinicAddress,
	patients: [{
		patientId,
		patientName,
		patientClinicId
	}]
}
```

```js
patient = {
	firstName,
	middleName,
	lastName,
	userName,
	clinicId,
	gender,
	email,
	birthDate,
	age,
	phone,
	medicalHistory,
	dentalHistory,
	xRays: [{
		xrayId
	}]
}
```

```js
xray = {
	originalURL,
	detectionURL,
	dentistComment,
	xrayDate
}
```
<br/><br/>

## License
The back-end is available under the [MIT License](https://github.com/Dentect/dental-diseases-detection-backend/blob/main/LICENSE).
