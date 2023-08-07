import express from "express";
import data from "./data/diagnoses";
import { filtered_data } from "./data/patient";
import cors from "cors";
import {addPatient} from "./services/patientservice";
import newPatientEntry from "./util";




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
            return res.status(404).json({error:"something went wrong"})
        }
    }

    return res.status(203).json(newPatient);
    
    
    
    
 });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



