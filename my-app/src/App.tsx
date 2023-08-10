import { useEffect, useState } from 'react';
import './App.css';
import toNewDiaryEntry from './util';
import dairyService from './services/dairyService';
import { DiaryEntry } from './types';
import AddDiaryForm from './components/AddDiaryForm';
import Diary from './components/Diary';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])

  useEffect(()=>{
    console.log('fetching data')

    dairyService.getAll().then(response => {
      console.log(response)
      setEntries(response)
    })
    
  },[])

  const handleSubmit = async (obj:object) => {
    const newEntry = toNewDiaryEntry(obj)
    const addedEntry = await dairyService.addDiary(newEntry) 
    setEntries(entries.concat(addedEntry))      
}



  return (
    <div>
      <AddDiaryForm handleSubmit={handleSubmit}/>
      <Diary entries={entries}/>
    </div>
  );
}

export default App;


