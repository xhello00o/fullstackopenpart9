export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
  }

export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
  }



export interface Diagnose {
    code: string;
      name:string;
      latin?: string
}


export type FilteredPatient = Omit<Patient, 'ssn'>;

export type NewPatientValues = Omit<Patient, "id" >;