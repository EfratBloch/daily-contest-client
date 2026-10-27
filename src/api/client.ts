import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,

});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token)
        config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use((response) => response, (error) => {

    const status = error.response?.status
    if (status === 401)
        localStorage.removeItem('token')
    return Promise.reject(error)
})

import type { ApiError } from '../types/api';
export const getErrorMessage = (error: unknown) => {
    if (axios.isAxiosError<ApiError>(error))
        {if (error.response)
            {return error.response.data?.error?.message??"אירעה שגיאה בשרת נסה שוב"}
        else
            return 'אין חיבור לשרת'}
    else
        return 'אירעה שגיאה ,נסה שוב'
}