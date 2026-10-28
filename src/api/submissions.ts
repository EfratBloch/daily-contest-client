import {api} from './client'
import type { GalleryResponse } from '../types/api'
import type { MySubmission, Submission } from '../types/submission'


export const getGallery=async(id:number,search?:string)=>{

    const res=await api.get<GalleryResponse>(`/api/contests/${id}/submissions`,{params:{search}})
    return res.data
}

export const createSubmission=async(id:number,title:string,description:string,file:File)=>{
    const formdata=new FormData()
    formdata.append('title',title)
    formdata.append('description',description)
    formdata.append('file',file)
    const res=await api.post<Submission>(`/api/contests/${id}/submissions`,formdata)
    return res.data
}
export const getMySubmissions=async()=>{
    const res=await api.get<MySubmission[]>(`/api/submissions/mine`)
    return res.data
}