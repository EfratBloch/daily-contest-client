import type { Contest } from "../types/contest";
import  {MapStatus,MapType} from "../utils/labels"
import { Link } from "react-router-dom";
import { formatDate } from "../utils/format";
export function ContestCard({contest}:{contest:Contest}){
    return <div className="card">
    <h3>{contest.title}</h3>
    <p className="badge">{MapStatus[contest.status]}</p>
    <p>{MapType[contest.submissionType]}</p>
    <p>{contest.instructions}</p>
    <p >מספר הגשות:{contest.submissionsCount}</p>
    <p className="muted">{formatDate(contest.createdAt)}</p>
    <Link className="btn" to={`/contests/${contest.id}`}>לתחרות</Link>
    </div>
}