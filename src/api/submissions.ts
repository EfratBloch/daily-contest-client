import {api} from './client'
import type { GalleryResponse } from '../types/api'


export const getGallery=async(id:number,search?:string)=>{

    const res=await api.get<GalleryResponse>(`/api/contests/${id}/submissions`,{params:{search}})
    return res.data
}