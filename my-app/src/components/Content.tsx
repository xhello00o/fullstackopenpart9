import { CoursePart } from "../types"


const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };


const Content = ({courseContent}:{courseContent:CoursePart[]}) => {




    return (
         <div>
            {courseContent.map(part => {

                switch (part.kind) {
                    case "basic":
                        return(
                            <div key={part.name}> 
                                <p> {part.name} {part.exerciseCount} </p>
                                <p> {part.description}</p>
                                </div> 
                        )
                    case "background":
                        return(
                            <div key={part.name}> 
                                <p> {part.name} {part.exerciseCount} </p>
                                <p> {part.description}</p>
                                <p> {part.backgroundMaterial}</p>
                                </div> 
                        )
                    case "group":
                        return(
                            <div key={part.name}> 
                                <p> {part.name} {part.exerciseCount} </p>
                                <p> project exercises {part.groupProjectCount}</p>
                                </div> 
                        )
                        case "special":
                            return(
                                <div key={part.name}> 
                                    <p> {part.name} {part.exerciseCount} </p>
                                    <p> {part.description}</p>
                                    <p> required skills: {part.requirements.join(",")}</p>
                                    </div> 
                            )

                        default:
                            return assertNever(part)

                    

                }

                
            })}
            </div>
            
        
    )

}

export default Content