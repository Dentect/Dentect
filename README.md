# dental-diseases-detection-backend
Make an application which dentists can use to diagnose specific abnormalities in less time and with better accuracy. Detecting dental anomalies from panoramic dental radiography.

# SignUp

`Post: http://localhost:3000/auth/signUp`

**Request**
> Required fields

	- firstName: string
	- lastName: string
	- email: string
	- password: string
	- medicalId: string
 
> Optional fields

	- yearsOfExperience: number
	- clinicAddress: string
	- clinicPhone: string

**Response**
	
	- The `newDentist` object

# SignIn

`Post: http://localhost:3000/auth/signIp`

**Request**
> Required fields

	- email: string
	- password: string

**Response**
	
	- The `dentistFound` object
	- jwt access token in auth-token header

---
==**The following endpoints require access token (bearer token)**==
---

# Add Patient

`Post: http://localhost:3000/dentists/patients`

**Request**
> Required fields

	- firstName: string
	- lastName: string
	- middleName: string
	- clinicId: number
	- gender: string
	- birthDate: date '2000-06-17'
 
> Optional fields

	- email: string
	- phone: string
	- medicalHistory: string
	- dentalHistory: string

**Response**
	
	- The created `patient` object

# Get Patient

`Get: http://localhost:3000/dentists/patients/:patientClinicId`

**Response**
	
	- The requested `patient` object

# Edit Patient

`Patch: http://localhost:3000/dentists/patients/:patientClinicId`
 
**Request**
> Optional fields

	- All fields could be edited

**Response**
	
	- The `updatedPatient` object

---
==**The following endpoints require patientClinicId as a req param**==
---

# Add Patient Xray (Detect)

`Post: http://localhost:3000/patients/:patientClinicId/xrays`

**Request**
> Required fields

	- xray: image
	- xrayDate: date
	note: both are attached as form-data

**Response**
	
	- The created `xray` object

# Get Patient Xrays

`Get: http://localhost:3000/patients/:patientClinicId/xrays`

**Response**
	
	- Array of `xrays` objects

# Returned objects format
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
	report,
	xrayDate
}
```
