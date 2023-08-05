export interface ExerciseResult {
    periodLength:number
    trainingDays: number
    success:boolean
    rating:number
    ratingDescription:string
    target:number
    average:number
}

const calculateExercises = (dailyHours:number[], target:number):ExerciseResult => {
    if (target === 0) {
        throw new Error("target cannot be zero");
    }

    const sum = dailyHours.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const average = sum/dailyHours.length;

    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(day => day!==0).length;
    

    let rating,success,ratingDescription;
    if (average>target+1){
        rating = 3;
        success = true;
        ratingDescription = "Well Done, you are an OverAchiever";
    } else if (average>= target) {
        rating = 2; 
        success = true;
        ratingDescription = "Good job, you have achieved your target";
    } else if (average >0.75* target){
        rating = 2;
        success =false; 
        ratingDescription = "Not too bad, but could be better";
    } else {
        rating = 1;
        success = false;
        ratingDescription = "Missed your target. Try harder next time";
    } 

    return {periodLength,trainingDays,success,average,target,rating,ratingDescription};
};

export interface ExerciseTarget {
    dailyHours: number[];
    target: number
}

const parseArg = (arg1:string,arg2:string[]):ExerciseTarget =>{
    
    const target = Number(arg1);
    const dailyHours = arg2.map(each => Number(each));

    return {dailyHours,target};
};


const {dailyHours, target} = parseArg(process.argv[2],process.argv.slice(3));
console.log(calculateExercises(dailyHours,target));


export default calculateExercises;
