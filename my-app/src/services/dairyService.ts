import axios from "axios"
import { DiaryEntry, NewDiaryEntry } from "../types"

const baseurl = 'http://localhost:3003/api'

const getAll = async () => {

    const response  = await axios.get<DiaryEntry[]>(`${baseurl}/diaries`)

    return response.data    
}

const addDiary = async (newDiary:NewDiaryEntry) => {
    console.log("🚀 ~ file: dairyService.ts:14 ~ addDiary ~ newDairy:", newDiary)

    const body = newDiary
    const response = await axios.post<DiaryEntry>(`${baseurl}/diaries`,body)

    return response.data
       
    
}

export default {
    getAll,
    addDiary
}