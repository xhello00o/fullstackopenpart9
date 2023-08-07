import { Gender, NewPatientValues } from "./types";


const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const isValidString = (text: unknown): text is string => {
    return typeof text === 'string' && text !== "" || text instanceof String;
  };
  
  const parseName = (comment: unknown): string => {
    if (!isValidString(comment)) {
      throw new Error('Incorrect value added for Name');
    }
  
    return comment;
  };

  const parseOccupation = (occupation: unknown): string => {
    if (!isValidString(occupation)) {
      throw new Error('Incorrect value added for Occupation');
    }
  
    return occupation;
  };

  const isGender = (gender:string): gender is Gender  =>{
    return Object.values(Gender).map(v => v.toString()).includes(gender);
  };

  const parseGender = (gender:unknown): Gender => {

    if (!isValidString(gender)|| !isGender(gender)){
        throw new Error(`${gender} is not valid`);
    }

     return gender;
  };

  const parseSSN = (ssn:unknown): string => {

    if (!isString(ssn)) {
        throw new Error("SSN is not valid");
    }

    return ssn; 
  };


  
  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
  const parseDate = (date: unknown): string => {
    if (!isValidString(date) || !isDate(date)) {
        throw new Error('Incorrect date: ' + date);
    }
    return date;
  };

 

const newPatientEntry = (entry:unknown): NewPatientValues => {
   

    if ( !entry || typeof entry !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }

    
    if ( "name" in entry && "occupation" in entry && "gender" in entry && "ssn" in entry && "dateOfBirth" in entry) {

        const newEntry:NewPatientValues = {
        name: parseName(entry.name),
        occupation: parseOccupation(entry.occupation),
        gender: parseGender(entry.gender),
        ssn: parseSSN(entry.ssn),
        dateOfBirth: parseDate(entry.dateOfBirth)
    
        };

        return newEntry;
        
    }
    else{
        throw new Error(" There are missing values");
    }






    
};

export default newPatientEntry;