import express from "express";
import data from "./data/diagnoses";
import patientsData,{ filtered_data } from "./data/patient";
import cors from "cors";
import {addPatient} from "./services/patientservice";
import newPatientEntry from "./util";
import { newEntry } from "./util";
import {v1 as uuid } from 'uuid';




const app = express();

app.use(cors());
app.use(express.json());


const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  return res.send('pong');
});

app.get("/api/diagnoses",(_req,res)=>{

   return res.status(201).json(data);

});


app.get("/api/patients",(_req,res)=>{

    return res.status(201).json(filtered_data);
 
 });

 app.post("/api/patients",(req,res)=>{
    console.log ("creating new",req.body);
    
    
    let newPatient;
    try {
        const newEntry = newPatientEntry(req.body);
         newPatient = addPatient(newEntry);
    }
    catch(error:unknown) {
        if (error instanceof Error) {
            return res.status(404).json({error:"something went wrong"});
        }
    }

    return res.status(203).json(newPatient);     
 });

 app.get("/api/patients/:id",(req,res)=>{
  

  const id = req.params.id;
  console.log(`retrieving ${id}`);
  const patientData = patientsData.find(patient => patient.id === id);

  if (!patientData) {
    return res.status(405).json({error:"could not find this patient"});
  }

    return res.status(203).json(patientData);

});

app.post("/api/patients/:id/entries", (req,res)=>{
  console.log("creating new entries");
  const id = req.params.id;
  const newid = uuid();
  try {
  const newEntryvalues = newEntry(req.body);
  const newEntryvalueswithID = {
    ...newEntryvalues,
    id: newid
  };

  
  const patientData = patientsData.find(patient => patient.id  === id);

  if (!patientData) {
    throw new Error("Patient not found");
  }
  patientData.entries.push(newEntryvalueswithID);
  
  return res.status(203).json(newEntryvalueswithID);


  
}
  catch(error:unknown) {
    if (error instanceof Error) {
      return res.status(405).send({error:error.message});
    }
    else {
      console.log(error);
      return res.status(404).send({error:"Something went wrong"});
    }

  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



