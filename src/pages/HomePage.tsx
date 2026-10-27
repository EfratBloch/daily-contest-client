import { useQuery } from "@tanstack/react-query"
import { getHome } from "../api/contests"
import { getErrorMessage } from "../api/client"
export function HomePage(){
    const{isLoading,data,error}=useQuery({queryKey:['home'],queryFn:getHome})    
    if(isLoading)
        return <p>טוען...</p>
    if(error)
        return <p>{getErrorMessage(error)}</p>
    if(!(data?.activeContest))
        return <p>אין כרגע תחרות פעילה</p>
    return <>    
    <h1>{data.activeContest.title}</h1>
    </>
}
