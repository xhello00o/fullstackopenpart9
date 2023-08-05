const calculateBmi =( centiheight: number,weight:number):string=> {

    const metreheight = centiheight /100

    const bmi =  weight / (metreheight**2)

    if (bmi < 16 ){
        return "Underweight (Severe thinness)"
    } else if (bmi<17){
        return "Underweight (Moderate thinness)"
    } else if (bmi<18.5) {
        return "Underweight (Mild thinness)"
    } else if (bmi<25) {
        return "Normal range"
    } else if (bmi<30) {
        return "Overweight (Pre-obese)"
    } else if (bmi<35) {
        return "Obese (Class I)"
    } else if (bmi<40) {
        return "Obese (Class II)"
    } else {
        return "Obese (Class III)"
    }

}

export default calculateBmi

const centiheight = Number(process.argv[2])
const weight = Number(process.argv[3])

console.log( calculateBmi(centiheight,weight))


