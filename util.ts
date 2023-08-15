import { Entry, Gender, NewPatientValues, Patient,Diagnose, newBaseEntry, HealthCheckRating, EntryWithoutId } from "./types";


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

  const parseDesc = (Desc: unknown):string => {
    if(!isValidString(Desc)){
      throw new Error("Incorrect value for description");
    }

    return Desc;
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

  const isHealthCheckRating = (rating:number): rating is HealthCheckRating =>{
    return Object.values(HealthCheckRating).includes(rating);
  };

  const parseHealthCheckRating = (rating:unknown):HealthCheckRating => {
    if (! (typeof rating === 'number') || isNaN(rating) || !isHealthCheckRating(rating)) {
      throw new Error(`${rating} is not valid`);
    }
    return rating;
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

  const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnose['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnose['code']>;
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
        dateOfBirth: parseDate(entry.dateOfBirth),
        entries:[]
    
        };

        return newEntry;
        
    }
    else{
        throw new Error(" There are missing values");
    }    
};

export const patientEntry = (entry:unknown):Patient => {

  if ( !entry || typeof entry !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

if ( "id" in entry && "name" in entry && "occupation" in entry && "gender" in entry && "ssn" in entry && "dateOfBirth" in entry) {

    const Entry:Patient = {
      id: entry.id as string,
    name: parseName(entry.name),
    occupation: parseOccupation(entry.occupation),
    gender: parseGender(entry.gender),
    ssn: parseSSN(entry.ssn),
    dateOfBirth: parseDate(entry.dateOfBirth),
    entries:[] as Entry[]

    };

    return Entry;
    
}
else{
    throw new Error(" There are missing values");
} 
};

export const newEntry = (entry:unknown ):EntryWithoutId =>{

  
  if ( !entry || typeof entry !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  const checkEntryType = (entry:object,EntryWithDiag:newBaseEntry):EntryWithoutId=>{
    if ("type" in entry) {
      switch (entry.type) {
        case "Hospital":
          if ("discharge" in entry && entry.discharge &&  typeof entry.discharge === 'object' && "date" in entry.discharge && "criteria" in entry.discharge) {
            const finalEntry:EntryWithoutId = {
              ...EntryWithDiag,
              type:"Hospital",
              discharge:{
                date:parseDate(entry.discharge.date),
                criteria:parseDesc(entry.discharge.criteria)
              }
            };

            return finalEntry;
          }
          else {
            throw new Error('some discharge information are not filled');
          } 
        case "HealthCheck":
        if ("healthCheckRating" in entry ) {
          const finalEntry:EntryWithoutId = {
            ...EntryWithDiag,
            type:"HealthCheck",
            healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)           
        };

        return finalEntry;
      }
      else {
        throw new Error("Rating is not filled up");
      }
      case "OccupationalHealthcare":
        if ("employerName" in entry) {
        const finalEntry:EntryWithoutId = {
          ...EntryWithDiag,
          type:"OccupationalHealthcare",
          employerName:parseName(entry.employerName),
         };
         if ("sickLeave" in entry && entry.sickLeave && typeof entry.sickLeave ==='object' && "startDate" in entry.sickLeave && "endDate" in entry.sickLeave) {
          const fullEntry:EntryWithoutId = {
            ...finalEntry,
            type:"OccupationalHealthcare",
            sickLeave: {
              startDate:parseDate(entry.sickLeave.startDate),
              endDate:parseDate(entry.sickLeave.endDate)
  
            }
          };

          return fullEntry;
         }
         return finalEntry;
        }
        else {
          throw new Error("There are missing values");
        }
        default:
          throw new Error(`${entry.type} is not a valid type`);
    }
  }
  else {
    throw new Error("There are missing values");
  }

  };


  if ("description" in entry && "date" in entry && "specialist" in entry ) {
    console.log("not missing desc or data or specialists ");
    const Entry:newBaseEntry = {
      description: parseDesc(entry.description),
      date:parseDate(entry.date),
      specialist:parseName(entry.specialist), 
    };
    
    if ("diagnosisCodes" in entry) {
      const EntryWithDiag:newBaseEntry ={
        ...Entry,
        diagnosisCodes:parseDiagnosisCodes(entry.diagnosisCodes)
      };
      
      const finalEntry = checkEntryType(entry,EntryWithDiag);
      return finalEntry;
    }
  else {
    const finalEntry = checkEntryType(entry,Entry);
    return finalEntry;
  }
} else {
  throw new Error("There are missing values");
}
};




export default newPatientEntry;