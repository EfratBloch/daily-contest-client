import {api} from './client'
import type { HomeData, Paged } from '../types/api'
import type { Contest } from '../types/contest'
import type { ContestsStatus } from "../types/contest";
import type { SubmissionType } from '../types/contest';
export interface ContestFilters {
    search?: string
    status?: ContestsStatus
    sort?: 'newest' | 'oldest'
    page?: number
}
export interface ContestInput{
    title:string,instructions:string,submissionType:SubmissionType
}

export const getHome=async()=>{

    const res=await api.get<HomeData>('/api/contests/home')
    return res.data
}

export const getContests = async (filters: ContestFilters = {}) => {
    const res = await api.get<Paged<Contest>>('/api/contests', { params: filters })
    return res.data
}
export const getContest=async(id:number)=>{

    const res=await api.get<Contest>(`/api/contests/${id}`)
    return res.data
}
export const createContest=async(contestInput:ContestInput)=>{

    const res=await api.post<Contest>('/api/contests',contestInput)
    return res.data
}
export const editContest=async(id:number,contestInput:ContestInput)=>{

    const res=await api.put<Contest>(`/api/contests/${id}`,contestInput)
    return res.data
}
