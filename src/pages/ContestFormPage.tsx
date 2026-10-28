import { z } from "zod"
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { useMutation ,useQueryClient,useQuery} from "@tanstack/react-query"
import { createContest, editContest, getContest} from "../api/contests"
import { useNavigate, useParams } from "react-router-dom"
import { getErrorMessage } from "../api/client";
import { Link } from "react-router-dom"
const contestSchema=z.object({
    title:z.string().min(3,'יש להזין כותרת לפחות 3 תווים').max(100,'אפשר עד 100 תווים'),
    instructions:z.string("יש להזין הוראה").min(1,"יש להזין הוראה").max(1000),
    submissionType:z.enum(['IMAGE','DOCUMENT'])
})

type ContestForm=z.infer<typeof contestSchema>
export function ContestFormPage(){    
    const {id}=useParams()
    const isEdit=!!id
    const{data:contest}=useQuery({queryKey:['contest',id],queryFn:()=>getContest(Number(id)),enabled:isEdit}) 
    const queryClient=useQueryClient()
    const navigate=useNavigate()
     const {mutate,isPending,error}=useMutation({
         mutationFn:(data:ContestForm)=>isEdit?editContest(Number(id),data):createContest(data),
         onSuccess:()=>{queryClient.invalidateQueries({queryKey:['home']});
         queryClient.invalidateQueries({queryKey:['contests']});
         queryClient.invalidateQueries({queryKey:['contest',id]});
         navigate('/contests')      
        }        
    }) 

    function onSubmit(data:ContestForm){mutate(data)}
    const {register,handleSubmit, formState: { errors } }=
    useForm<ContestForm>({resolver:zodResolver(contestSchema),values:contest})
       
    return <>
    <h1>{isEdit?"עריכת תחרות":"תחרות חדשה"}</h1>
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
    <div>
        <label>כותרת</label>
        <input {...register('title')} type= "text" />
        <p>{errors.title?.message}</p>
    </div>
    <div>
        <label>הוראה</label>
        <textarea {...register('instructions')}/>
        <p>{errors.instructions?.message}</p>                 
    </div> 
    <div>
    <label >סוג הגשה</label>
    <select {...register('submissionType')}>
    <option value="IMAGE">תמונות</option>
    <option value="DOCUMENT">כתיבה</option>        
    </select>    
    </div> 
    {error&&<p>{getErrorMessage(error)}</p>}
     <button type="submit" disabled={isPending}>שמירה</button> 
    
    </form>
    <Link to={`/contests/${id}`}>לדף התחרות</Link>
    </>
}