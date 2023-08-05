import express from "express";
const app= express();
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";
import { ExerciseTarget } from "./exerciseCalculator";

app.use(express.json());

app.get('/bmi', (req,res)=> {
    console.log(req.body);
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (typeof height !== 'number' || typeof weight!== 'number') {
        return res.status(404).json({error:"malformatted parameters"});

    }
    

    console.log(height,weight);
    const bmi = calculateBmi(height,weight);
    console.log("🚀 ~ file: index.ts:12 ~ app.get ~ bmi:", bmi);

    return res.status(201).json({height,weight,bmi});
    
});

app.post('/exercises',  (req,res)=> {
   
    console.log(req.body);
     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    if (req.body === undefined||req.body.target=== undefined || req.body.daily_exercises === undefined) {
        return res.status(405).json({error:"parameters missing" });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,
    const {target,daily_exercises} = req.body;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    console.log(daily_exercises.every((element: number) => typeof element === "number"));

    if (typeof target !== 'number' || 
    (Array.isArray(daily_exercises) && !daily_exercises.every(element => typeof element === "number"))){
        
        return res.status(405).json({error:"malformatted parameters" });
    }


    const exerciseResult = calculateExercises(daily_exercises as ExerciseTarget["dailyHours"],target);

    return res.status(301).send(exerciseResult);



});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });



