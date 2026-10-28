import { getErrorMessage } from "../api/client"
import { useParams } from "react-router-dom"
import { MapStatus } from "../utils/labels"
import { closeContest, getContest, startVoting } from "../api/contests"
import { useQuery ,useQueryClient,useMutation} from "@tanstack/react-query"
import { Link } from "react-router-dom"
import type { ContestsStatus } from "../types/contest"
export function ManageContestPage(){
    const {id}=useParams() 
    const{data,isLoading,error}=useQuery({queryKey:['contest',id],queryFn:()=>getContest(Number(id))}) 
    const queryClient=useQueryClient()
    const {mutate,error:actionError,isPending}=useMutation({
             mutationFn:(status:ContestsStatus)=>status==="SUBMISSION"?startVoting(Number(id)):closeContest(Number(id)),
             onSuccess:()=>{
             queryClient.invalidateQueries({queryKey:['contest',id]});     
             queryClient.invalidateQueries({queryKey:['winners']});     
             queryClient.invalidateQueries({queryKey:['gallery',id]});     
             queryClient.invalidateQueries({queryKey:['contests']});     
             queryClient.invalidateQueries({queryKey:['home']});}
            }) 
    if(isLoading)
        return <p>טוען...</p>
    if(error)
        return <p>{getErrorMessage(error)}</p>
    if(!data)
        return null
    return<>
    <h1>ניהול: {data.title}</h1>
    <p className="badge">שלב: {MapStatus[data.status]}</p>
    <p><Link className="btn btn-light" to={`/admin/contests/${id}/edit`}>עריכה</Link></p>
    <p><Link className="btn btn-light" to={`/contests/${id}`}>לדף התחרות</Link></p>
    {data.status!=="CLOSED"&&<button onClick={()=>mutate(data.status)} disabled={isPending}>{data.status=="SUBMISSION"?"התחלת הצבעה":"סגירה והכרזה על הזוכות"}</button>}  
    <p className="error">{actionError&&getErrorMessage(actionError)}</p>
    </>
}