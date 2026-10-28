import type { Submission } from "../types/submission";
import { formatDate } from "../utils/format";
export function SubmissionCard({submission,canVote,onVote}:{submission:Submission,canVote:boolean,onVote:(submission: Submission) => void}){
    return <div className={submission.votedByMe?"card voted":"card"}>
    <h3>{submission.title}</h3>
    <div>
    <a href={submission.fileUrl} target="_blank">לצפייה</a>
    {submission.fileKind==='IMAGE'?<img src={submission.thumbnailUrl??submission.fileUrl} alt={submission.title}></img>:<p>{submission.textContent}</p>}
    </div>
    <p>{submission.author.name}</p>
    {canVote&&<button onClick={()=>onVote(submission)}>{submission.votedByMe?"ביטול הצבעה":"להצביע"}</button>}
    {submission.description&&<p>{submission.description}</p>}
    {submission.place&&<p >מקום {submission.place}</p>}
    {submission.points!==null&&<p >{submission.points} נקודות </p>}
    <p>{formatDate(submission.createdAt)}</p>
    </div>
}