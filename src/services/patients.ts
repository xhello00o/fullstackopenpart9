import axios from "axios";
import { Entry, EntryWithoutId, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getOne =  async (id:string) => {
  const {data } = await axios.get<Patient> (`${apiBaseUrl}/patients/${id}`)

  return data
}

const create = async (object: PatientFormValues) => {
  console.log("posting new patient")
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  ); 

  

  return data;
};

const createEntry = async (object:EntryWithoutId,id:Patient["id"] )=> {

  console.log("creating new Entry");


  const {data}   = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`,object )

  return data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, getOne,createEntry
};

