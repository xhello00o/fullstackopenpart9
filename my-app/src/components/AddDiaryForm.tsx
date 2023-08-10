
import { FormControl,FormLabel,RadioGroup,FormControlLabel,Radio,Input } from '@mui/material'
import {useState} from 'react'
import { Visibility, Weather } from '../types'





const AddDiaryForm = ({handleSubmit}:{handleSubmit:(obj:object)=>void}) => {
    const [date , setDate ] = useState('')
    const [weather, setWeather ] = useState('')
    const [visibility, setVisibility] = useState('')
    const [comment, setComment] = useState('')

    const resetFields = () => {
        setDate('')
        setComment('')
        setWeather('')
        setVisibility('')        
    }

    const onSubmit = (event:React.SyntheticEvent) => {
        event.preventDefault()
        handleSubmit({date,weather,visibility,comment})
        resetFields()
    }  
// missing error handling.. 



    return(
        <div>
            <h2> Add New Entry </h2>
            <form onSubmit={onSubmit}>
                <div>
                <FormControl>
                    <FormLabel > Date </FormLabel>
                    <Input  type='date' value={date} onChange={(e)=>{setDate(e.target.value)}} fullWidth={true}/>
                   
                    </FormControl>
                    </div>
                    <div>
                    <FormControl>
                    <FormLabel>Weather</FormLabel>
                    <RadioGroup row name='weather' value={weather} onChange={(e)=>{setWeather(e.target.value)}}>
                        <FormControlLabel value={Weather.Sunny} control={<Radio/>} label={"Sunny"}/>
                        <FormControlLabel value={Weather.Rainy} control={<Radio/>} label={"Rainy"}/>
                        <FormControlLabel value={Weather.Cloudy} control={<Radio/>} label={"Cloudy"}/>
                        <FormControlLabel value={Weather.Stormy} control={<Radio/>} label={"Stormy"}/>
                        <FormControlLabel value={Weather.Windy} control={<Radio/>} label={"Windy"}/>
                         </RadioGroup>
                         </FormControl>
                         </div>
                         <div>
                         <FormControl>

                    <FormLabel>Visibility</FormLabel>
                    
                    
                    <RadioGroup row name='visibility' value={visibility} onChange={(e)=>{setVisibility(e.target.value)}}>
                        <FormControlLabel value={Visibility.Great} control={<Radio/>} label={"Great"}/>
                        <FormControlLabel value={Visibility.Good} control={<Radio/>} label={"Good"}/>
                        <FormControlLabel value={Visibility.Ok} control={<Radio/>} label={"OK"}/>
                        <FormControlLabel value={Visibility.Poor} control={<Radio/>} label={"Poor"}/>
                        
                         </RadioGroup>

                    </FormControl>
                    </div>
    
                <p> Comment<input type="text " value={comment} onChange={(e)=>{setComment(e.target.value)}} /> </p>  
                <button type="submit"> Submit</button>              
            </form>

        </div>
    )
}

export default AddDiaryForm