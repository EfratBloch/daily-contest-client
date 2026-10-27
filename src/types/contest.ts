import type { Submission } from './submission';
export type SubmissionType='IMAGE'|'DOCUMENT';
export type ContestsStatus='SUBMISSION'|'VOTING'|'CLOSED'

export interface Contest{
  "id": number,
  "title": string,
  "instructions": string,
  "submissionType": SubmissionType,
  "status": ContestsStatus,
  "createdAt": string,
  "votingStartedAt": string|null,
  "closedAt": string|null,
  "submissionsCount": number,
  "winners": Submission[]
}