import axios from "axios"

const API = axios.create({baseURL: 'http://localhost:8000'})

export const signin = (formData) => API.post('/user/signin', formData)

export const signup = (formData) => API.post('/user/signup', formData)
