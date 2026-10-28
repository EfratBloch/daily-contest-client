import { useQuery ,useQueryClient} from "@tanstack/react-query"
import { getGallery } from "../api/submissions"
import { getErrorMessage } from "../api/client"
import { Link, useParams } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { MapStatus } from "../utils/labels"
import { SubmissionCard } from "../components/SubmissionCard"
import { useAuth } from "../context/AuthContext"
import type { Submission } from "../types/submission"
import { unvote, vote } from "../api/votes"

export function ContestPage(){
    const user=useAuth().user 
    const queryClient=useQueryClient()
    const {id}=useParams()
    const {mutate,error:voteError}=useMutation({
             mutationFn:(submission:Submission)=>submission.votedByMe?unvote(submission.id):vote(submission.id),
             onSuccess:()=>{queryClient.invalidateQueries({queryKey:['gallery',id]});     
            }        
        }) 
    
    const{data,isLoading,error}=useQuery({queryKey:['gallery',id],queryFn:()=>getGallery(Number(id))}) 
    if(isLoading)
        return <p>טוען...</p>
    if(error)
        return <p>{getErrorMessage(error)}</p>
    if(!data)
        return null
    
    return <>    
    <h1>{data.contest.title}</h1>
    <p>{data.contest.instructions}</p>
    {user?.role=="ADMIN"&&<Link className="btn" to={`/admin/contests/${id}`}>ניהול התחרות</Link>}
    {data.contest.status==="SUBMISSION"&&user?.role==="USER"&&!data.items.some(s=>s.isMine)&&<Link className="btn" to={`/contests/${id}/submit`}>להגשת יצירה משלך</Link>}
    {data.items.length===0&&<p>עוד אין הגשות</p>}
    <p className="badge">{MapStatus[data.contest.status]}</p>
    <p className="error">{voteError&&getErrorMessage(voteError)}</p>
    <div className="grid">
    {data.items.map(c=><SubmissionCard submission={c} key={c.id} onVote={(submission:Submission)=>mutate(submission)} canVote={data.contest.status==='VOTING'&&user?.role==='USER'&&!c.isMine}></SubmissionCard>)}
    </div>
    </>
}