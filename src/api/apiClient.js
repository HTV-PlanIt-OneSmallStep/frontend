import axios from "axios"

export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:3000',//process.env.REACT_APP_BACKEND_URL,
        timeout: 4000
    }
)


export const apiTaskClient = axios.create(
    {
        baseURL: `http://localhost:3000/api/plan/schedule`,
        timeout: 35000
    }
)
