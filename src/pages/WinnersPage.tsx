import { useQuery } from "@tanstack/react-query"
import { getErrorMessage } from "../api/client"
import { Link } from "react-router-dom"
import { SubmissionCard } from "../components/SubmissionCard"
import { getWinners } from "../api/contests"
export function WinnersPage(){
    const{isLoading,data,error}=useQuery({queryKey:['winners'],queryFn:getWinners})    
    if(isLoading)
        return <p>טוען...</p>
    if(error)
        return <p>{getErrorMessage(error)}</p>
    if(!data)
        return null
    const last=data.items.find(c=>c.winners.length>0)
    if(!last)
        return <>עוד אין מנצחים</>
    return <div >
    <h1>המנצחים האחרונים!!!</h1>
    <p><Link to={`/contests/${last.id}`}>{last.title}</Link></p>
    <div className="grid">{last.winners.map((c)=><div key={c.id}>
                                              <SubmissionCard submission={c} canVote={false} onVote={()=>{}}></SubmissionCard>
                                            </div>)}
    </div>
    </div>
}
