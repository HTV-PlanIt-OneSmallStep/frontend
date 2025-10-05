import axios from "axios"

export const apiClient = axios.create(
    {
        baseURL: process.env.REACT_APP_BACKEND_URL,
        timeout: 1000
    }
)


export const apiTaskClient = axios.create(
    {
        baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/plan/schedule`,
        timeout: 1000
    }
)
