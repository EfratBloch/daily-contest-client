import { useState } from "react"
import type { ContestsStatus } from "../types/contest"
import { getContests } from "../api/contests"
import { useQuery ,keepPreviousData} from "@tanstack/react-query"
import { getErrorMessage } from "../api/client"
import { ContestCard } from "../components/ContestCard"
export function ContestsPage() {
    const [search, setSearch] = useState<string>("")
    const [status, setStatus] = useState<ContestsStatus | "">("")
    const [sort, setSort] = useState<'newest' | 'oldest'>("newest")
    const [page, setPage] = useState<number>(1)
    const { isLoading, data, error } = useQuery({
        queryKey: ['contests',
            { search, status, sort, page }], queryFn: () => getContests({ search, status: status || undefined, sort, page })
    ,placeholderData:keepPreviousData})
        return <>
        <h1>כל התחרויות</h1>
        <div className="filters">
        <input value={search} onChange={(e)=>{setSearch(e.target.value);setPage(1)}}placeholder="חיפוש"></input>
        <select value={status} onChange={(e)=>{setStatus(e.target.value as ContestsStatus | "");setPage(1)}}>
        <option value="">הכול</option>
        <option value="SUBMISSION">הגשה</option>
        <option value="VOTING">הצבעה</option>
        <option value="CLOSED">סגורה</option>
        </select>
        <select value={sort} onChange={(e)=>{setSort(e.target.value as 'newest' | 'oldest');setPage(1)}}>
        <option value="newest">מהחדשה לישנה</option>
        <option value="oldest">מהישנה לחדשה</option>
        </select>
        </div>
        {isLoading&&<p>טוען...</p>}
        {error&&<p>{getErrorMessage(error)}</p>}
        <div className="grid">
        {data?.items.map(c=><ContestCard contest={c} key={c.id}></ContestCard>)}
        </div>
        {data&&<div className="pagination">
        <button disabled={page===1} onClick={()=>setPage(page-1)}>הקודם</button>
        <p>עמוד {data.page} מתוך {data.totalPages}</p>
        <button disabled={page===data.totalPages} onClick={()=>setPage(page+1)}>הבא</button>
        </div>}
</>
}