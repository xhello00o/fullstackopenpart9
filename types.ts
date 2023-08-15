export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
  }




export interface Diagnose {
    code: string;
      name:string;
      latin?: string
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Diagnose['code'][];
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface SickLeave {
  startDate:string;
  endDate:string;
}

interface OccupationalHealthcareEntry extends BaseEntry{
  type:"OccupationalHealthcare";
  employerName:string;
  sickLeave?: SickLeave
}

interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type:"Hospital";
  discharge: Discharge;

}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
    entries: Entry[]
  }

export type FilteredPatient = Omit<Patient, 'ssn'>;

export type NewPatientValues = Omit<Patient, "id" >;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type newBaseEntry = Omit<BaseEntry,'id'>;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;