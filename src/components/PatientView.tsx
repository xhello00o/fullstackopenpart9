import React, { SyntheticEvent } from 'react';
import axios from 'axios';
import { useParams} from 'react-router'
import patientService from "../services/patients";
import { useEffect, useState } from 'react';
import { Diagnosis, EntryWithoutId, Gender, Patient } from '../types';
import { Divider, List, ListItem, ListItemIcon, ListItemText, Button, Dialog,DialogTitle,DialogContent,Alert} from '@mui/material';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AddEntryFrom from './AddEntryForm';

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };


const PatientView = ({diagnoses}:{diagnoses:Diagnosis[]}) => {
    const [patient,setPatient] = useState<Patient>({
        gender:Gender.Male,
        entries:[],
        id:'',
        name:'',
        occupation:''
    })
    const [entryFormView, setEntryFormView] = useState(false)
    const [error,setError] =useState<String | undefined>()
   const id = useParams().id

   const diagnoseDescription = (code:string):string => {
    const desc = diagnoses.find(diagnosis => diagnosis.code === code)
    if (!desc ) {
        return code
    }

    return `${code} ${desc.name}`
   }

   const notifyError = (message) => {
    setTimeout(()=>setError(message),3000)
   }

    useEffect(() => {
        if ( !id){
            throw new Error('id is invalid')
        }
    
        const fetchPatient = async () => {
          const patient = await patientService.getOne(id);
          console.log("🚀 ~ file: PatientView.tsx:39 ~ fetchPatient ~ patient:", patient)
          

          patient.entries = patient.entries.map(entry => {

            if (!entry.diagnosisCodes) {
                return entry
            }

            entry.diagnosisCodes = entry.diagnosisCodes.map(diagnoseDescription)
            return entry
          }) 



          setPatient(patient);
        };
        void fetchPatient();
      }, []);

      const handleCreate = async (object:EntryWithoutId):Promise<void> => {
        

        try {
            if ( !id){
                throw new Error('id is invalid')
            }
            const entry = await patientService.createEntry(object,id);
            console.log("🚀 ~ file: PatientView.tsx:69 ~ handleCreate ~ entry:", entry)
            
            const updatedPatient = {...patient}
            updatedPatient.entries = patient?.entries.concat(entry)
            setPatient(updatedPatient);
            setEntryFormView(false);
          } catch (e: unknown) {
            console.log(e)
            if (axios.isAxiosError(e)) {
                console.log("error Message", e.message)
                console.log("response data", e.response?.data)
              if (e?.response?.data && typeof e?.response?.data === "string") {
                const message = e.response.data.replace('Something went wrong. Error: ', '');
                console.error(message);
                notifyError(message);
              } else {
                notifyError("Unrecognized axios error");
              }
            } else {
              console.error("Unknown error", e);
              notifyError("Unknown error");
            }
          } }


        


    

    return (
        <div>
            <h3> {patient?.name} </h3>
            <p> gender: {patient?.gender}</p>
            <p> ssh: {patient?.ssn} </p>
            <p> occupation: {patient?.occupation} </p>
            <h4> Entries </h4>
            
            {
            
            patient?.entries.length === 0 ?
            <p>None</p>
            : <List>
                
            {patient?.entries.map(entry => {

                switch (entry.type) {
                    case "HealthCheck":
                        return(
                            <ListItem key={entry.id} style={{border:"1px solid black"}}>
                        <ListItemIcon>
                            <MonitorHeartIcon/>
                        </ListItemIcon>
                        <ListItemText primary={
                            
                            <p style={{fontWeight: "bold"}}>{entry.date} {entry.description} </p>  
                            
                                }  secondary={entry.diagnosisCodes?
                            
                                    <ul>
                                        {entry.diagnosisCodes.map(code => {
                                            return(
                                                <li key={code}> {code} </li>
                                            )
                                        })}
                                    </ul>
                                    
                                    :null} disableTypography/>
                                                         

                            <Divider/>

                        
                           </ListItem>

                        )
                    case "Hospital":
                        return (
                            <ListItem key={entry.id} style={{border:"1px solid black"}}>
                        <ListItemIcon>
                            <LocalHospitalIcon/>
                        </ListItemIcon>
                        <ListItemText primary={<p style={{fontWeight: "bold"}}> {entry.date} {entry.description} </p> }
                        
                        secondary={entry.diagnosisCodes?
                            <ul>
                                {entry.diagnosisCodes.map(code => {
                                    return(
                                        <li key={code}> {code} </li>
                                    )
                                })}
                            </ul>
                            :null} disableTypography/>

                            <Divider/>

                        
                           </ListItem>
                        )
                    case "OccupationalHealthcare":
                        return (
                            <ListItem key={entry.id} style={{border:"1px solid black"}}>
                        <ListItemIcon>
                            <MedicalServicesIcon/>
                        </ListItemIcon>
                        <ListItemText primary={<p style={{fontWeight: "bold"}}> {entry.date} {entry.description} </p> } disableTypography 
                        
                        secondary={entry.diagnosisCodes?
                            <ul>
                                {entry.diagnosisCodes.map(code => {
                                    return(
                                        <li key={code}> {code} </li>
                                    )
                                })}
                            </ul>
                            :null} />
                        
                        
                            

                            <Divider/>

                        
                           </ListItem>
                        )
                    default:
                        return assertNever(entry)


                }


            }
             )}
             </List>
            
            

            }
            {entryFormView?
            
            <Dialog fullWidth={true} open={entryFormView} onClose={() => setEntryFormView(false)}>
            <DialogTitle>Add a new Entry</DialogTitle>
            <Divider />
            <DialogContent>
            {error && <Alert severity="error">{error}</Alert>}
    
            <AddEntryFrom diagnoses={diagnoses} closeView={setEntryFormView} setError={notifyError} handleCreate={handleCreate}/>

            </DialogContent>
            </Dialog>
            :<Button variant="contained" onClick={() => setEntryFormView(true)}>
            Add New Entry
          </Button>
            }


           
        </div>

    )

    





}

export default PatientView