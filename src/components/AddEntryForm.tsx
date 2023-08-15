import { TextField, Autocomplete,FormControl,InputLabel,Select,MenuItem,Button,Grid, Box } from "@mui/material";
import React, { SyntheticEvent } from "react";
import { useState } from "react";
import { BaseEntry, Diagnosis, Entry, EntryWithoutId, HealthCheckRating, newBaseEntry } from "../types";

const AddEntryFrom = ({diagnoses,closeView,setError,handleCreate}
    :{diagnoses:Diagnosis[],closeView: React.Dispatch<React.SetStateAction<boolean>>,
        setError:React.Dispatch<React.SetStateAction<String | undefined>>,
    handleCreate:(object: EntryWithoutId) => void}) => { 
        const todayDateString =()=>{
            const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10)
        return formattedDate
        }   
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(()=>todayDateString());
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes,setDiagnosisCodes] = useState<Diagnosis[] >([])
    const [type, setType]= useState<Entry['type']>("HealthCheck")
    const [dischargeDate, setDischargeDate] = useState("")
    const [criteria, setCriteria] =useState('')
    const [employerName,setEmployerName] = useState('')
    const [startDate, setStartDate]= useState('')
    const [endDate,setEndDate] =useState('')
    const [healthCheckRating,setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy)
    

    if (!diagnoses) {
        
    }

    

    const resetTypeFields = () => {

        setDischargeDate('')
        setCriteria('')
        setEmployerName('')
        setStartDate('')
        setEndDate('')
        setHealthCheckRating(HealthCheckRating.Healthy)
    }

    const onCancel = () => {
        setDescription("")
        setDate(()=>todayDateString())
        setSpecialist('')
        setDiagnosisCodes([])
        resetTypeFields()
        closeView(false)
    }

    const handleSubmit = (event:SyntheticEvent) => {
        event.preventDefault()
        const baseEntry:newBaseEntry = {
            date,
            description,
            specialist,
            diagnosisCodes:diagnosisCodes.map(diagnosis => diagnosis.code)
        }

        switch (type) {
            case "HealthCheck":
                const FullEntry:EntryWithoutId = {
                    ...baseEntry,
                    healthCheckRating,
                    type,
                }
                handleCreate(FullEntry)
                resetTypeFields()
                break
            case "Hospital":
                const FullHospitalEntry:EntryWithoutId = {
                    ...baseEntry,
                    discharge: {
                        date:dischargeDate,
                        criteria
                    },
                    type,
                }
                handleCreate(FullHospitalEntry)
                resetTypeFields()
                break
            case "OccupationalHealthcare":

                const FullOccupationHCEntry:EntryWithoutId = {
                    ...baseEntry,
                    type,
                    employerName,
                    sickLeave:{
                        startDate,
                        endDate
                    },
                }
                handleCreate(FullOccupationHCEntry)
                resetTypeFields()

                
                break
            default:
                resetTypeFields()
                break
        }
    }
    

    const typeForm= ()=> {
        switch (type) {
            case "Hospital":
              return (
                <div>
                  <TextField fullWidth required label="Discharge Date" type="Date" value={dischargeDate} onChange={(e) => {
                    resetTypeFields()
                    setDischargeDate(e.target.value)} } />
                  <TextField fullWidth required label="Criteria" type="text" value={criteria} onChange={(e) => { 
                  setCriteria(e.target.value)} } />
                </div>
              );
            case "OccupationalHealthcare":
              return (
                <div>
                <FormControl fullWidth>
                  <TextField fullWidth required label="Employer Name" type="text" value={employerName} onChange={(e) =>{ 
                   setEmployerName(e.target.value)}} />
                   </FormControl>
                   <FormControl fullWidth>
                  <TextField fullWidth required label="Sick Leave Start Date" type="Date" value={startDate} onChange={(e) =>{ 
                     setStartDate(e.target.value)} }/>
                     </FormControl>
                     <FormControl fullWidth>
                  <TextField fullWidth required label="Sick Leave End Date" type="Date" value={endDate} onChange={(e) =>{ 
                     setEndDate(e.target.value)}} />
                     </FormControl>

                     </div>
                
                
              );
              case "HealthCheck":
                return (

                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Health Care Rating</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={healthCheckRating}
                      label="Health Care Rating"
                      onChange={(event)=> {
                        resetTypeFields()
                        const choseType = event.target.value as HealthCheckRating

                        setHealthCheckRating(choseType)}}
                    >
                      <MenuItem value={HealthCheckRating.CriticalRisk}>CriticalRisk</MenuItem>
                      <MenuItem value={HealthCheckRating.HighRisk}> HighRisk</MenuItem>
                      <MenuItem value={HealthCheckRating.Healthy}> Healthy</MenuItem>
                      <MenuItem value={HealthCheckRating.LowRisk}> LowRisk</MenuItem>
                    </Select>
                  </FormControl> 

                )

            default:
              return null;
          }
        
    }



    

    



    return (
        


        <div>
            
            
            
            <form onSubmit={handleSubmit} style={{border:"1px"}}>
                
                <TextField fullWidth required label="Description" type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                <TextField fullWidth required label="Date" type="Date" value={date} onChange={(e)=>{setDate(e.target.value)}}/>
                <TextField fullWidth required label="Specialist" type="text" value={specialist} onChange={(e)=>{setSpecialist(e.target.value)}}/>
                <Autocomplete 
                    multiple
                    id="tags-standard"
                    options={diagnoses}
                    getOptionLabel={(option:Diagnosis) => option.code}
                    value={diagnosisCodes}
                    onChange={(event: any, newValue: Diagnosis[] ) => {
                    setDiagnosisCodes(newValue);
                    }}
                    
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Diagnosis Codes"
                    />
                
                    )}
                      
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={type}
                      label="Type"
                      onChange={(event)=> {
                        const choseType = event.target.value as Entry['type']
                        setType(choseType)}}
                    >
                      <MenuItem value={"Hospital"}>Hospital</MenuItem>
                      <MenuItem value={"OccupationalHealthcare"}>Occupational Healthcare</MenuItem>
                      <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
                    </Select>
                  </FormControl>  
                  {typeForm() }

                 
                    <Grid>
                    <Grid item>
                        <Button
                        color="secondary"
                        variant="contained"
                        style={{ float: "left" }}
                        type="button"
                        onClick={onCancel}
                        >
                        Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                        style={{
                            float: "right",
                        }}
                        type="submit"
                        variant="contained"
                        >
                        Add
                        </Button>
                    </Grid>
                    </Grid>
            </form>
            
        </div>
      

    )
}

export default AddEntryFrom