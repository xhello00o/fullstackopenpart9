import { DiaryEntry } from "../types"


const Diary = ({entries}:{entries:DiaryEntry[]})=> {

    return(
        <div>
            <h2> Diary Entries</h2>
            {entries.map(entry =>{

                return(
                    <div key={entry.id}>
                        <h3> {entry.date} </h3>
                        <p> visibility: {entry.visibility}</p>
                        <p> weather: {entry.weather}</p>
                        <p> {entry.comment} </p>
                    </div>
                )
            } ) }

        </div>

    )
}

export default Diary