import typedPatientData from "../data/patient";
import { NewPatientValues, Patient } from "../types";
import {v1 as uuid} from "uuid";

const patientData = typedPatientData;


export const addPatient = (entry:NewPatientValues): Patient => {
    const id = uuid();
    const newEntry = {
        id, ...entry
    };

    patientData.push(newEntry);

    return newEntry;
};

