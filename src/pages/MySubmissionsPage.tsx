import { useQuery } from "@tanstack/react-query"
import { getErrorMessage } from "../api/client"
import { getMySubmissions } from "../api/submissions"
import { Link } from "react-router-dom"
import { SubmissionCard } from "../components/SubmissionCard"
export function MySubmissionsPage(){
    const{isLoading,data,error}=useQuery({queryKey:['my-submissions'],queryFn:getMySubmissions})    
    if(isLoading)
        return <p>טוען...</p>
    if(error)
        return <p>{getErrorMessage(error)}</p>
    if(!data)
        return null
    if((data?.length===0))
        return <div className="home"><p>עוד לא הגשת לאף תחרות</p></div>
    return <div >
    <h1>ההגשות שלי</h1>
    <div className="grid">{data.map((c)=><div key={c.id}><Link to={`/contests/${c.contest.id}`}>{c.contest.title}</Link>
                                              <SubmissionCard submission={c} canVote={false} onVote={()=>{}}></SubmissionCard>
                                            </div>)}
    </div>
    </div>
}
