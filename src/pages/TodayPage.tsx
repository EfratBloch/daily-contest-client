import { useQuery } from "@tanstack/react-query"
import { getHome } from "../api/contests"
import { getErrorMessage } from "../api/client"
import { Navigate } from "react-router-dom"
export function TodayPage(){
    const{isLoading,data,error}=useQuery({queryKey:['home'],queryFn:getHome})    
    if(isLoading)
        return <p>טוען...</p>
    if(error)
        return <p>{getErrorMessage(error)}</p>
    if(!(data?.activeContest))
        return <div className="home"><p>אין כרגע תחרות פעילה</p></div>
    return <>
    <Navigate to={`/contests/${data.activeContest.id}`} replace />

</>
}
