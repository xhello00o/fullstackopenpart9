import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";

const getDiagnosis = async () => {

    const res = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`)
    return res.data
}

export default {getDiagnosis}