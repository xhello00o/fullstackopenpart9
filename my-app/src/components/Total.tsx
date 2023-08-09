import { CoursePart } from "../types"

const Total = ({courseContent}:{courseContent:CoursePart[]}) => {




    return (
        <p>
        Number of exercises{" "}
        {courseContent.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    )

}

export default Total