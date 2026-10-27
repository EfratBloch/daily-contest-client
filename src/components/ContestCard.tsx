import type { Contest } from "../types/contest";
import  {MapStatus,MapType} from "../utils/labels"
import { Link } from "react-router-dom";
import { formatDate } from "../utils/format";
export function ContestCard({contest}:{contest:Contest}){
    return <div>
    <h3>{contest.title}</h3>
    <p>{MapStatus[contest.status]}</p>
    <p>{MapType[contest.submissionType]}</p>
    <p>{contest.instructions}</p>
    <p >מספר הגשות:{contest.submissionsCount}</p>
    <Link to={`/contests/${contest.id}`}>לתחרות</Link>
    <p>{formatDate(contest.createdAt)}</p>
    </div>
}