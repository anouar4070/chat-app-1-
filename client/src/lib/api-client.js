import axios from "axios"
import { HOST } from "./contants"


export  const apiClient = axios.create({
baseURL: HOST,
})
