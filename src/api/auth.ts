import {api} from './client'
import type{ AuthResponse} from '../types/api'
import type { User } from '../types/user'

export const login=async(email:string,password:string)=>{

    const res=await api.post<AuthResponse>('/api/auth/login',{email,password})
    return res.data
}
export const register=async(name:string,email:string,password:string)=>{

    const res=await api.post<AuthResponse>('/api/auth/register',{name,email,password})
    return res.data
}
export const getMe=async()=>{

    const res=await api.get<User>('/api/auth/me')
    return res.data
}


