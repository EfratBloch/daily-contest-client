import { api } from "./client";
import type { VotesSmmary } from "../types/votes";

export const vote =async(id:number)=>{
    const res=await api.post<VotesSmmary>(`/api/submissions/${id}/vote`)
    return res.data
} 
export const unvote =async(id:number)=>{
    const res=await api.delete<VotesSmmary>(`/api/submissions/${id}/vote`)
    return res.data
} 